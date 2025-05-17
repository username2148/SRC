// @name 文本翻译插件（修复版）
// @version 1.1.0
// @description 通过关键词匹配替换页面文本为英文

// 定义中英文对照词典
const TRANSLATION_DICT = {
    "学生": "Student",
    "抽选": "Draw",
    "名单": "List",
    "历史": "History",
    "添加": "Add",
    "移除": "Remove",
    "清空": "Clear",
    "保存": "Save",
    "确定": "Confirm",
    "取消": "Cancel",
    "上传": "Upload",
    "文件": "File",
    "次数": "Times",
    "冷却": "Cooldown",
    "导出": "Export",
    "数据": "Data",
    "插件": "Plugin",
    "管理": "Manage",
    "设置": "Settings",
    "随机": "Random",
    "姓名": "Name",
    "学号": "Student ID",
    "分组": "Group",
    "统计": "Statistics",
    "主题": "Theme",
    "音效": "Sound",
    "提醒": "Reminder",
    "二维码": "QR Code"
};

// 存储按钮引用避免选择器问题
let translateButton;
let switchBackButton;

// 添加翻译按钮
api.addButton('🌐 切换英文', function() {
    // 存储按钮引用
    if (!translateButton) translateButton = this;
    
    // 替换页面文本
    replaceText(TRANSLATION_DICT);
    
    // 更新按钮文本
    translateButton.textContent = '🌐 Switch to Chinese';
    api.alert('界面已切换为英文');
});

// 添加切换回中文按钮
api.addButton('🌐 切换中文', function() {
    // 存储按钮引用
    if (!switchBackButton) switchBackButton = this;
    
    // 创建反向词典
    const reverseDict = Object.fromEntries(
        Object.entries(TRANSLATION_DICT).map(([key, value]) => [value, key])
    );
    
    // 替换回中文
    replaceText(reverseDict);
    
    // 更新按钮文本
    switchBackButton.textContent = '🌐 切换英文';
    api.alert('界面已切换回中文');
});

// 文本替换函数
function replaceText(dict) {
    document.querySelectorAll('*').forEach(node => {
        if (node.nodeType === 3) { // 文本节点
            const text = node.textContent.trim();
            if (dict[text]) {
                node.textContent = node.textContent.replace(text, dict[text]);
            }
        }
    });
}