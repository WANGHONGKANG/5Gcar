// logs.js
const util = require('../../utils/util.js')
Page({
  data: {
    StartX:'595',
    StartY:'40',
    leftLooks: '',
    topLooks: '',
    //半径
    radius: '75',
  },
  //拖动摇杆移动
  ImageTouchMove: function (e) {
    var self = this;
    var touchX = e.touches[0].clientX - 40;
    var touchY = e.touches[0].clientY - 40;
    var movePos = self.GetPosition(touchX, touchY);
    self.setData({
      leftLooks: movePos.posX,
      topLooks: movePos.posY
    })
  },
  //获得触碰位置并且进行数据处理获得触碰位置与拖动范围的交点位置
  GetPosition: function (touchX, touchY) {
    var self = this;
    var DValue_X;
    var Dvalue_Y;
    var Dvalue_Z;
    var imageX;
    var imageY;
    var ratio;
    DValue_X = touchX - self.data.StartX;
    Dvalue_Y = touchY - self.data.StartY;
    Dvalue_Z = Math.sqrt(DValue_X * DValue_X + Dvalue_Y * Dvalue_Y);
    //触碰点在范围内
    if (Dvalue_Z <= self.data.radius) {
    imageX = touchX;
    imageY = touchY;
    imageX = Math.round(imageX);
    imageY = Math.round(imageY);
    return { posX: imageX, posY: imageY };
    }
     
    //触碰点在范围外
    else {
    ratio = self.data.radius / Dvalue_Z;
    imageX = DValue_X * ratio + 595;
    imageY = Dvalue_Y * ratio + 40;
    imageX = Math.round(imageX);
    imageY = Math.round(imageY);
    return { posX: imageX, posY: imageY };
    }
    },
  ImageTouch: function (e) {
  },
  //松开摇杆复原
  ImageReturn: function (e) {
    var self = this;
    self.setData({
    leftLooks: self.data.StartX,
    topLooks: self.data.StartY,
    })
  },
})
