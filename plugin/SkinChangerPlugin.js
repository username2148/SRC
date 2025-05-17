// @name 界面换肤插件
// @version 1.0.0
const skins = {
    light: {
        bg: '#f0f8ff',
        accent: '#4CAF50'
    },
    dark: {
        bg: '#2d2d2d',
        accent: '#2d2d2c'
    },
    blue: {
        bg: '#e3f2fd',
        accent: '#2196F3'
    }
};

api.addButton('🎨 更换主题', function() {
    const skin = prompt('请选择主题：light/dark/blue', 'light');
    if (!skins[skin]) return;
    
    document.body.style.backgroundColor = skins[skin].bg;
    document.querySelectorAll('button').forEach(btn => {
        btn.style.backgroundColor = skins[skin].accent;
        btn.style.borderColor = skins[skin].accent;
    });
    api.alert(`已切换至 ${skin} 主题`);
});