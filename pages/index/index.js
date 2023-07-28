const app = getApp()
import CryptoJS from '../../utils/crypto'
// 加密和解密的密钥
var key = CryptoJS.enc.Utf8.parse("9c17e7dc8aa0e89a92f475bb0e42c00d79c08add746b53ebf0c1491d0fc999cffa0995096f22a6b45555");
Page({
  data: {
    height: 20,
    focus: false,
  },
  onLoad(){

  },
  bindButtonTap: function() {
    this.setData({
      focus: true
    })
  },
  bindFormSubmit: function(e) {
    console.log(CryptoJS)
    var myObject = { name: "Alice", age: 25 };

    // 提交对象并返回密文和密钥
    var result = this.submitObject(myObject);
    var cipherText = result.cipherText;
    var key = result.key;
    console.log("密文:", cipherText);
    console.log("密钥:", key);

    // 提交密钥并返回之前提交的对象
    var retrievedObject = this.retrieveObject(cipherText, key);
    console.log("恢复的对象:", retrievedObject);
  },
  // 提交一个对象并返回一个密钥
  submitObject(obj) {
    var jsonString = JSON.stringify(obj);

    // 加密对象数据
    var encryptedData = CryptoJS.AES.encrypt(jsonString, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });

    // 返回密文和密钥
    return {
      cipherText: encryptedData.toString(),
      key: key.toString(CryptoJS.enc.Utf8)
    };
  },

  // 提交密钥并返回之前提交的对象
  retrieveObject(cipherText, key) {
    // 解密密文
    var decryptedData = CryptoJS.AES.decrypt(cipherText.toString(), CryptoJS.enc.Utf8.parse(key), {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });

    // 将解密后的数据转换为对象
    var jsonString = decryptedData.toString(CryptoJS.enc.Utf8);
    return JSON.parse(jsonString);
  }

})
