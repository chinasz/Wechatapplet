const app = getApp()
const options = {
  duration: 60000,
  //sampleRate: 44100,
  //numberOfChannels: 1,
  //encodeBitRate: 192000,
  format: 'mp3',
  frameSize: 50
};
const recorderManager = wx.getRecorderManager();
recorderManager.onStart(() => {
  console.log('recorder start')
})
recorderManager.onPause(() => {
  console.log('recorder pause')
})
recorderManager.onStop((res) => {
  console.log('recorder stop', res)
  const { tempFilePath } = res
  wx.uploadFile({
    url: '' + app.util.url('entry/wxapp/myrecord') + '&state=we7sid-' + wx.getStorageSync('userInfo').sessionid+'&m=xin_cplove',
    filePath: tempFilePath,
    name: 'file',
    success:function(res){

    }
  })
})
recorderManager.onFrameRecorded((res) => {
  const { frameBuffer } = res
  console.log('frameBuffer.byteLength', frameBuffer.byteLength)
})

module.exports = {
  recorderManager:recorderManager,
  options:options
}