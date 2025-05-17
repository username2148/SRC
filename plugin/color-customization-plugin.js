// @name 颜色自定义插件
// @version 1.0.0

(function() {
    // 插件内部状态
    const state = {
        colors: {
            bgColor: '#f0f8ff',
            containerColor: '#ffffff',
            buttonColor: '#4CAF50',
            resultColor: '#ff4444',
            confettiColor: '#f44336'
        },
        defaultColors: {
            bgColor: '#f0f8ff',
            containerColor: '#ffffff',
            buttonColor: '#4CAF50',
            resultColor: '#ff4444',
            confettiColor: '#f44336'
        }
    };

    // 初始化插件
    function init() {
        // 从本地存储加载颜色设置
        loadColors();
        
        // 应用已保存的颜色
        applyColors();
        
        // 创建颜色设置UI
        createColorSettingsUI();
        
        // 添加颜色变化监听器
        setupColorListeners();
        
        // 添加重置按钮
        addResetButton();
        
        console.log('[颜色自定义插件] 已初始化');
    }

    // 从本地存储加载颜色设置
    function loadColors() {
        try {
            const savedColors = localStorage.getItem('colorCustomizationPlugin');
            if (savedColors) {
                state.colors = JSON.parse(savedColors);
            }
        } catch (error) {
            console.error('[颜色自定义插件] 加载颜色设置失败:', error);
        }
    }

    // 保存颜色设置到本地存储
    function saveColors() {
        try {
            localStorage.setItem('colorCustomizationPlugin', JSON.stringify(state.colors));
        } catch (error) {
            console.error('[颜色自定义插件] 保存颜色设置失败:', error);
        }
    }

    // 应用颜色设置
    function applyColors() {
        // 设置背景色
        document.body.style.backgroundColor = state.colors.bgColor;
        
        // 设置容器颜色
        const container = document.querySelector('.container');
        if (container) {
            container.style.backgroundColor = state.colors.containerColor;
        }
        
        // 设置按钮颜色
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            if (!button.classList.contains('delete-btn')) {
                button.style.backgroundColor = state.colors.buttonColor;
                button.style.color = getTextColor(state.colors.buttonColor);
            }
        });
        
        // 设置结果区域颜色
        const resultDiv = document.getElementById('result');
        if (resultDiv) {
            resultDiv.style.color = state.colors.resultColor;
            resultDiv.style.borderColor = state.colors.buttonColor;
        }
        
        // 设置删除按钮颜色
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.style.backgroundColor = state.colors.resultColor;
        });
        
        // 设置学生项颜色
        const studentItems = document.querySelectorAll('.student-item');
        studentItems.forEach(item => {
            item.style.backgroundColor = lightenColor(state.colors.containerColor, 0.9);
        });
        
        // 设置历史项颜色
        const historyItems = document.querySelectorAll('.history-item');
        historyItems.forEach(item => {
            item.style.backgroundColor = lightenColor(state.colors.containerColor, 0.95);
        });
        
        // 设置插件区域颜色
        const pluginSection = document.querySelector('.plugin-section');
        if (pluginSection) {
            pluginSection.style.backgroundColor = lightenColor(state.colors.containerColor, 0.97);
            pluginSection.style.borderColor = lightenColor(state.colors.containerColor, 0.8);
        }
        
        // 设置删除区域颜色
        const deleteSection = document.querySelector('.delete-section');
        if (deleteSection) {
            deleteSection.style.backgroundColor = lightenColor(state.colors.containerColor, 0.97);
        }
        
        // 设置设置区域颜色
        const settingsSection = document.querySelector('.settings-section');
        if (settingsSection) {
            settingsSection.style.backgroundColor = lightenColor(state.colors.containerColor, 0.97);
            settingsSection.style.borderColor = lightenColor(state.colors.containerColor, 0.8);
        }
        
        // 设置插件项边框颜色
        const pluginItems = document.querySelectorAll('.plugin-item');
        pluginItems.forEach(item => {
            item.style.borderColor = lightenColor(state.colors.containerColor, 0.8);
        });
        
        // 更新颜色预览
        document.querySelectorAll('.color-preview').forEach(preview => {
            const target = preview.dataset.target;
            if (target && state.colors[target]) {
                preview.style.backgroundColor = state.colors[target];
            }
        });
    }

    // 创建颜色设置UI
    function createColorSettingsUI() {
        // 查找设置面板
        const settingsSection = document.querySelector('.settings-section');
        if (!settingsSection) return;
        
        // 创建颜色设置区域
        const colorSection = document.createElement('div');
        colorSection.className = 'color-settings';
        colorSection.innerHTML = `
            <h4>颜色设置</h4>
            <div class="color-picker-container">
                <label class="color-picker-label">背景颜色：</label>
                <div class="color-preview" data-target="bgColor"></div>
                <input type="color" class="color-input" data-target="bgColor" value="${state.colors.bgColor}">
            </div>
            <div class="color-picker-container">
                <label class="color-picker-label">容器颜色：</label>
                <div class="color-preview" data-target="containerColor"></div>
                <input type="color" class="color-input" data-target="containerColor" value="${state.colors.containerColor}">
            </div>
            <div class="color-picker-container">
                <label class="color-picker-label">按钮颜色：</label>
                <div class="color-preview" data-target="buttonColor"></div>
                <input type="color" class="color-input" data-target="buttonColor" value="${state.colors.buttonColor}">
            </div>
            <div class="color-picker-container">
                <label class="color-picker-label">结果区域颜色：</label>
                <div class="color-preview" data-target="resultColor"></div>
                <input type="color" class="color-input" data-target="resultColor" value="${state.colors.resultColor}">
            </div>
            <div class="color-picker-container">
                <label class="color-picker-label">彩带颜色：</label>
                <div class="color-preview" data-target="confettiColor"></div>
                <input type="color" class="color-input" data-target="confettiColor" value="${state.colors.confettiColor}">
            </div>
            <div id="color-reset-container"></div>
        `;
        
        // 添加到设置面板
        settingsSection.appendChild(colorSection);
        
        // 更新颜色预览
        setTimeout(applyColors, 100);
    }

    // 设置颜色变化监听器
    function setupColorListeners() {
        document.querySelectorAll('.color-input').forEach(input => {
            input.addEventListener('input', function() {
                const target = this.dataset.target;
                if (target && state.colors[target]) {
                    state.colors[target] = this.value;
                    applyColors();
                }
            });
            
            input.addEventListener('change', function() {
                saveColors();
            });
        });
    }

    // 添加重置按钮
    function addResetButton() {
        const resetContainer = document.getElementById('color-reset-container');
        if (!resetContainer) return;
        
        const resetButton = document.createElement('button');
        resetButton.textContent = '重置颜色';
        resetButton.className = 'reset-color-btn';
        resetButton.onclick = resetColors;
        
        resetContainer.appendChild(resetButton);
    }

    // 重置颜色
    function resetColors() {
        if (confirm('确定要将所有颜色重置为默认值吗？')) {
            state.colors = { ...state.defaultColors };
            
            // 更新输入框
            document.querySelectorAll('.color-input').forEach(input => {
                const target = input.dataset.target;
                if (target && state.colors[target]) {
                    input.value = state.colors[target];
                }
            });
            
            // 应用并保存
            applyColors();
            saveColors();
        }
    }

    // 辅助函数：计算文本颜色（根据背景色亮度）
    function getTextColor(hexColor) {
        // 将十六进制颜色转换为RGB
        const r = parseInt(hexColor.substr(1, 2), 16);
        const g = parseInt(hexColor.substr(3, 2), 16);
        const b = parseInt(hexColor.substr(5, 2), 16);
        
        // 计算亮度
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        
        // 根据亮度确定文本颜色
        return luminance > 0.5 ? '#000000' : '#ffffff';
    }

    // 辅助函数：调整颜色亮度
    function lightenColor(hexColor, amount) {
        // 将十六进制颜色转换为RGB
        let r = parseInt(hexColor.substr(1, 2), 16);
        let g = parseInt(hexColor.substr(3, 2), 16);
        let b = parseInt(hexColor.substr(5, 2), 16);
        
        // 调整亮度
        r = Math.min(255, Math.max(0, Math.round(r * amount)));
        g = Math.min(255, Math.max(0, Math.round(g * amount)));
        b = Math.min(255, Math.max(0, Math.round(b * amount)));
        
        // 转换回十六进制
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }

    // 拦截彩带动画创建，应用自定义颜色
    function plugin_beforeDraw(data) {
        // 存储原始函数
        if (!window._originalCreateConfetti) {
            window._originalCreateConfetti = window.createConfetti;
            
            // 重写彩带动画函数
            window.createConfetti = function() {
                // 保存原始彩带颜色生成逻辑
                const originalGenerateColors = window.generateColorVariations;
                
                // 临时替换为使用自定义颜色
                window.generateColorVariations = function(baseColor, count) {
                    return originalGenerateColors(state.colors.confettiColor || baseColor, count);
                };
                
                // 调用原始函数
                window._originalCreateConfetti();
                
                // 恢复原始函数
                window.generateColorVariations = originalGenerateColors;
            };
        }
        
        return data;
    }

    // 注册插件事件处理函数
    window[`plugin_${encodeURIComponent('颜色自定义插件')}_beforeDraw`] = plugin_beforeDraw;

    // 初始化插件
    init();
})();    