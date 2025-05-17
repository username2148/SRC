// @name 首学生加权插件
// @version 1.0.0

// 重写随机抽选逻辑（通过beforeDraw事件）
window.plugin_首学生加权插件_beforeDraw = function(options) {
    if (students.length === 0) return;

    // 获取首个学生
    const firstStudent = students[0];
    
    // 计算加权抽选逻辑
    const random = Math.random();
    if (random < 0.5) {
        // 50%概率返回首个学生
        return { 
            modifiedResults: [firstStudent], 
            // 处理多抽情况（可选）
            remainingStudents: students.slice(1) 
        };
    } else {
        // 正常随机逻辑（排除首个学生后抽选）
        const remaining = students.slice(1);
        if (remaining.length === 0) return { modifiedResults: [firstStudent] };
        
        const index = Math.floor(Math.random() * remaining.length);
        return { 
            modifiedResults: [remaining[index]], 
            remainingStudents: [...remaining.slice(0, index), ...remaining.slice(index+1)] 
        };
    }
};