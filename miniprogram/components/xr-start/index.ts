// components/xr-start/index.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    isSetLocation: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTouchRtx4090() {
      const d = this.scene.getElementById("rtx4090");
      this.animator.play("Full Takeoff Mode (Spinning Fans)");
      setTimeout(() => {
        this.animator.pause("Full Takeoff Mode (Spinning Fans)");
      }, 10000);
      wx.showToast({ title: `播放模型动画` });
    },
    handleTouchModel: function ({ detail }) {
      const d = this.scene.getElementById("btn");
      console.log(d);
      wx.showToast({ title: `播放模型动画` });
      setTimeout(() => {
        this.animator.pause("Full Takeoff Mode (Spinning Fans)");
      }, 10000);
      this.animator.play("Full Takeoff Mode (Spinning Fans)");
    },

    handleReady: function ({ detail }) {
      this.scene = detail.value;
      const xrFrameSystem = wx.getXrFrameSystem();
      this.camera = this.scene
        .getElementById("camera")
        .getComponent(xrFrameSystem.Camera);
    },
    handleAssetsLoaded: function ({ detail }) {
      this.triggerEvent("assetsLoaded", detail.value);
    },
    handleTick: function ({ detail }) {},
    handleAssetsLoaded: function ({ detail }) {
      wx.showToast({ title: "点击屏幕放置" });
      this.scene.event.add("touchstart", () => {
        if (!this.isSetLocation) {
          this.scene.ar.placeHere("setitem", true);
          this.isSetLocation = true;
          return;
        }
      });
    },

    handleRtxRotation: function (detail) {
      console.log(detail);
    },

    handleGLTFLoaded: function ({ detail }) {
      const el = detail.value.target;
      const animator = el.getComponent("animator");
      this.animator = animator;
    },
  },
});
