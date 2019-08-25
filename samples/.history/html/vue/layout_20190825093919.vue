<template lang="html">
  <div class="wrapper-layout-grid">
    <grid-layout
      :layout="testLayout"
      :autoSize="true"
      :isMirrored="false"
      :col-num="12"
      :row-height="30"
      :is-draggable="true"
      :is-resizable="true"
      :vertical-compact="true"
      :responsive="true"
      :breakpoints="{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}"
      :cols="{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}"
      :margin="[10, 10]"
      :use-css-transforms="true"
      class="gridLayout"
      :class="{maximized: maximizeID}"
      @layout-created="layoutCreatedEvent"
      @layout-before-mount="layoutBeforeMountEvent"
      @layout-mounted="layoutMountedEvent"
      @layout-ready="layoutReadyEvent"
      @layout-updated="layoutUpdatedEvent"
    >
      <grid-item
        v-for="item in testLayout"
        :key="item.i"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :static="item.static"
        :i="item.i"
        class="gridItem"
        :class="{
          maximized: maximizeID == item.i,
          hidden: maximizeID && maximizeID != item.i
        }"
        @dblclick.native="maximizeID === null ? (maximizeID = item.i) : (maximizeID = null)"
        @resize="resizeEvent"
        @move="moveEvent"
        @resized="resizedEvent"
        @moved="movedEvent"
      >
        {{ item.i }}
      </grid-item>
    </grid-layout>
  </div>
</template>

<script>
import VueGridLayout from "vue-grid-layout";
// Add to other Vue components
//
// export default {
//     components: {
//         GridLayout: VueGridLayout.GridLayout,
//         GridItem: VueGridLayout.GridItem
//     },
// // ... data, methods, mounted (), etc.
// }

export default {
  data() {
    return {
      maximizeID: null,
      testLayout: [
        {x: 0, y: 0, w: 2, h: 2, i: "0"},
        {x: 2, y: 0, w: 2, h: 4, i: "1"},
        {x: 4, y: 0, w: 2, h: 5, i: "2"},
        {x: 6, y: 0, w: 2, h: 3, i: "3"},
        {x: 8, y: 0, w: 2, h: 3, i: "4"},
        {x: 10, y: 0, w: 2, h: 3, i: "5", static: true},
        {x: 0, y: 5, w: 2, h: 5, i: "6"},
        {x: 2, y: 5, w: 2, h: 5, i: "7"},
        {x: 4, y: 5, w: 2, h: 5, i: "8"},
        {x: 6, y: 3, w: 2, h: 4, i: "9"},
        {x: 8, y: 4, w: 2, h: 4, i: "10"},
        {x: 10, y: 4, w: 2, h: 4, i: "11"},
        {x: 0, y: 10, w: 2, h: 5, i: "12"},
        {x: 2, y: 10, w: 2, h: 5, i: "13"},
        {x: 4, y: 8, w: 2, h: 4, i: "14"},
        {x: 6, y: 8, w: 2, h: 4, i: "15"},
        {x: 8, y: 10, w: 2, h: 5, i: "16"},
        {x: 10, y: 4, w: 2, h: 2, i: "17"},
        {x: 0, y: 9, w: 2, h: 3, i: "18"},
        {x: 2, y: 16, w: 2, h: 4, i: "19"},
        {x: 3, y: 16, w: 2, h: 2, i: "20"},
        {x: 3, y: 16, w: 2, h: 1, i: "21"},
        {x: 3, y: 16, w: 2, h: 3, i: "22"},
        {x: 3, y: 16, w: 2, h: 2, i: "23"},
        {x: 3, y: 16, w: 2, h: 4, i: "24"},
        {x: 3, y: 16, w: 2, h: 2, i: "25"}
      ]
    };
  },
  methods: {
    layoutCreatedEvent: function(newLayout) {
      console.log("Created layout: ", newLayout);
    },
    layoutBeforeMountEvent: function(newLayout) {
      console.log("beforeMount layout: ", newLayout);
    },
    layoutMountedEvent: function(newLayout) {
      console.log("Mounted layout: ", newLayout);
    },
    layoutReadyEvent: function(newLayout) {
      console.log("Ready layout: ", newLayout);
    },
    layoutUpdatedEvent: function(newLayout) {
      console.log("Updated layout: ", newLayout);
    },
    moveEvent: function(i, newX, newY) {
      console.log("MOVE i=" + i + ", X=" + newX + ", Y=" + newY);
    },
    resizeEvent: function(i, newH, newW, newHPx, newWPx) {
      console.log(
        "RESIZE i=" + i + ", H=" + newH + ", W=" + newW + ", H(px)=" + newHPx + ", W(px)=" + newWPx
      );
    },
    movedEvent: function(i, newX, newY) {
      console.log("MOVED i=" + i + ", X=" + newX + ", Y=" + newY);
    },
    resizedEvent: function(i, newH, newW, newHPx, newWPx) {
      console.log(
        "RESIZED i=" + i + ", H=" + newH + ", W=" + newW + ", H(px)=" + newHPx + ", W(px)=" + newWPx
      );
    }
  }
};
</script>

<style lang="scss" scoped>
div.wrapper-layout {
  // height:1000px !important;
  overflow-y: auto;
  // padding-right: 3em !important;
}

.vue-grid-layout {
  // width: 100% !important;
  height: 100% !important;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  transition: height 0.2s ease;
  padding-right: 5rem !important;
}

.vue-grid-layout div {
    display: block;
}

.vue-grid-item {
    transition: all .2s ease;
    // transition-property: left, top, right, width;
}

.gridItem {
  /* width is omitted from the properties in vue-grid-layout
      and that causes transitions to appear weirdly during maximize */
  transition-property: left, top, right, width;
}

.vue-grid-item:not(.vue-grid-placeholder) {
    background: #ccc;
    border: 1px solid black;
}

.vue-grid-item.static {
    background: #eee;
    border: 1px dotted black;
}

.gridLayout.maximized {
  height: 100% !important;
}

.gridItem.hidden {
  display: none;
}

.gridItem.maximized {
  transform: inherit !important;
  height: 100% !important;
  width: 100% !important;
}
</style>
