// @name 二维码生成插件
// @version 1.0.0
api.addButton('📱 生成二维码', function() {
    const qr = new QRCode(document.body, {
        text: JSON.stringify(students),
        width: 128,
        height: 128
    });
    
    api.alert('已生成名单二维码（页面底部显示）');
    // 清理二维码（30秒后）
    setTimeout(() => document.body.removeChild(qr._domElement), 30*1000);
});
// 需引入qrcodejs库（添加<script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>）