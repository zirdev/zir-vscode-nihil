import usb.core
import usb.util
import struct
import sys
from binascii import hexlify as hx, unhexlify as uhx
from pathlib import Path

CMD_ID_EXIT = 0
CMD_ID_FILE_RANGE = 1
CMD_TYPE_RESPONSE = 1


def send_response_header(out_ep, cmd_id, data_size):
    out_ep.write(b'TUC0')  # USB Command 0
    out_ep.write(struct.pack('<B', CMD_TYPE_RESPONSE))
    out_ep.write(b'\x00' * 3)
    out_ep.write(struct.pack('<I', cmd_id))
    out_ep.write(struct.pack('<Q', data_size))
    out_ep.write(b'\x00' * 0xC)


def file_range_cmd(rndstr_dir, in_ep, out_ep, data_size):
    file_range_header = in_ep.read(0x20)

    range_size = struct.unpack('<Q', file_range_header[:8])[0]
    range_offset = struct.unpack('<Q', file_range_header[8:16])[0]
    rndstr_name_len = struct.unpack('<Q', file_range_header[16:24])[0]
    # in_ep.read(0x8) # Reserved
    rndstr_name = bytes(in_ep.read(rndstr_name_len)).decode('utf-8')

    print('Range Size: {}, Range Offset: {}, Name len: {}, Name: {}'.format(
        range_size, range_offset, rndstr_name_len, rndstr_name))
    send_response_header(out_ep, CMD_ID_FILE_RANGE, range_size)

    with open(rndstr_name, 'rb') as f:
        f.seek(range_offset)

        curr_off = 0x0
        end_off = range_size
        read_size = 0x100000

        while curr_off < end_off:
            if curr_off + read_size >= end_off:
                read_size = end_off - curr_off

            buf = f.read(read_size)
            out_ep.write(data=buf, timeout=0)
            curr_off += read_size


def poll_commands(rndstr_dir, in_ep, out_ep):
    while True:
        cmd_header = bytes(in_ep.read(0x20, timeout=0))
        magic = cmd_header[:4]
        print('Magic: {}'.format(magic), flush=True)

        if magic != b'TUC0':  # USB Command 0
            continue

        cmd_type = struct.unpack('<B', cmd_header[4:5])[0]
        cmd_id = struct.unpack('<I', cmd_header[8:12])[0]
        data_size = struct.unpack('<Q', cmd_header[12:20])[0]

        print('Cmd Type: {}, Command id: {}, Data size: {}'.format(
            cmd_type, cmd_id, data_size), flush=True)

        if cmd_id == CMD_ID_EXIT:
            print('Exiting...')
            break
        elif cmd_id == CMD_ID_FILE_RANGE:
            file_range_cmd(rndstr_dir, in_ep, out_ep, data_size)


def send_rndstr_list(rndstr_dir, out_ep):
    rndstr_path_list = list()
    rndstr_path_list_len = 0

    # Add all files with the extension .rndstr in the provided dir
    for rndstr_path in [f for f in rndstr_dir.iterdir() if f.is_file() and f.suffix == '.rndstr']:
        rndstr_path_list.append(rndstr_path.__str__() + '\n')
        rndstr_path_list_len += len(rndstr_path.__str__()) + 1

    print('Sending header...')

    out_ep.write(b'TUL0')  # USB List 0
    out_ep.write(struct.pack('<I', rndstr_path_list_len))
    out_ep.write(b'\x00' * 0x8)  # Padding

    print('Sending rndstr list: {}'.format(rndstr_path_list))

    for rndstr_path in rndstr_path_list:
        out_ep.write(rndstr_path)


def print_usage():
    print("""\
usb_install_pc.py

Usage: usb_install_pc.py <folder>""")


if __name__ == '__main__':
    if len(sys.argv) != 2:
        print_usage()
        sys.exit(1)

    rndstr_dir = Path(sys.argv[1])

    if not rndstr_dir.is_dir():
        raise ValueError('1st argument must be a directory')

    # Find the Device
    dev = usb.core.find(idVendor=0x0AAA, idProduct=0x9000)

    if dev is None:
        raise ValueError('Device is not found!')

    dev.reset()
    dev.set_configuration()
    cfg = dev.get_active_configuration()

    def is_out_ep(ep): return usb.util.endpoint_direction(
        ep.bEndpointAddress) == usb.util.ENDPOINT_OUT
    def is_in_ep(ep): return usb.util.endpoint_direction(
        ep.bEndpointAddress) == usb.util.ENDPOINT_IN
    out_ep = usb.util.find_descriptor(cfg[(0, 0)], custom_match=is_out_ep)
    in_ep = usb.util.find_descriptor(cfg[(0, 0)], custom_match=is_in_ep)

    assert out_ep is not None
    assert in_ep is not None

    send_rndstr_list(rndstr_dir, out_ep)
    poll_commands(rndstr_dir, in_ep, out_ep)
