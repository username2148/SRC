# SRC
简单学生随机抽选
常见的插件 API 类型及功能简述：
**1. 基础工具接口
提供日志输出、弹窗提示等基础功能：
api.log(message)
功能：在控制台或系统日志区域输出带插件标识的信息，用于调试或记录操作。
示例：api.log('插件初始化完成');
api.alert(message)
功能：显示带插件名称的弹窗，用于向用户反馈操作结果或提示信息。
示例：api.alert('数据导出成功！');
**2. UI 扩展接口
允许插件修改或新增界面元素：
api.addButton(label, callback)
功能：在系统界面中添加自定义按钮。
参数：
label：按钮显示文本（如 “统计人数”）。
callback：按钮点击时执行的函数。
示例：
javascript
api.addButton('生成二维码', () => { /* 二维码生成逻辑 */ });

api.modifyDOM(selector, props)
功能：通过选择器修改页面 DOM 元素的属性（如样式、内容）。
示例：
javascript
api.modifyDOM('#drawButton', { style: { backgroundColor: '#4CAF50' } });

**3. 数据访问接口
获取或修改系统核心数据：
api.getStudents()
功能：获取当前学生名单数组。
返回值：Array，如 ['张三', '李四']。
api.setStudents(students)
功能：修改学生名单（需谨慎使用，可能影响系统状态）。
参数：Array，如 ['Alice', 'Bob']。
api.getHistory()
功能：获取抽选历史记录数组（包含时间、结果等信息）。
**4. 事件监听与拦截接口
监听系统事件或拦截默认行为：
api.on(eventName, handler)
功能：监听系统事件（如抽选、名单更新）。
常用事件：
drawStart：抽选开始时触发。
studentsAdded：添加学生后触发。
historyUpdated：抽选历史更新后触发。
示例：
javascript
api.on('studentsAdded', (newStudents) => {
  api.log(`新增学生：${newStudents.join(', ')}`);
});

api.before(eventName, handler)
功能：在事件执行前拦截并修改默认逻辑（如修改抽选结果）。
示例：
javascript
api.before('draw', (originalResult) => {
  return ['强制指定学生']; // 覆盖原始抽选结果
});

**5. 配置与存储接口
管理插件配置或持久化数据：
api.getConfig(key)
功能：获取插件配置项（如用户自定义的抽选概率）。
示例：const weight = api.getConfig('firstStudentWeight');
api.setConfig(key, value)
功能：保存插件配置项（如用户设置的主题颜色）。
api.saveToLocalStorage(key, data)
功能：将数据持久化存储到浏览器本地（关闭页面后数据保留）。
示例：api.saveToLocalStorage('pluginSettings', { theme: 'dark' });
**6. 高级功能接口
实现复杂功能（如网络请求、文件操作）：
api.fetch(url, options)
功能：发起网络请求（如获取远程数据）。
示例：
javascript
api.fetch('https://api.example.com/students', { method: 'GET' })
  .then(response => api.log(response.data));

api.exportFile(data, filename, type)
功能：导出数据为文件（如 CSV、Excel）。
示例：
javascript
api.exportFile(students.join(','), 'students.csv', 'text/csv');
