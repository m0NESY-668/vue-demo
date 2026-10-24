// d:\install package\treasure.js
// 模拟宝藏地图API
class TreasureMap {
    static getInitialClue() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ message: "在古老的图书馆里找到了第一个线索...", icon: "📜" });
            }, 1500);
        });
    }

    static decodeAncientScript(clue) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!clue) {
                    reject("没有线索可以解码!");
                }
                resolve({ message: "解码成功!宝藏在一座古老的神庙中...", icon: "🔮" });
            }, 2000);
        });
    }

    static searchTemple(location) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const random = Math.random();
                if (random < 0.3) {
                    reject("糟糕!遇到了神庙守卫!");
                }
                resolve({ message: "找到了一个神秘的箱子...", icon: "📦" });
            }, 2500);
        });
    }

    static solvePuzzle() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const random = Math.random();
                if (random < 0.3) {
                    reject("谜题太难了，无法解开!");
                }
                resolve({ message: "成功解开机关!宝箱就在眼前...", icon: "🧩" });
            }, 2000);
        });
    }

    static openTreasureBox() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ message: "恭喜!你找到了传说中的宝藏!💎", icon: "👑" });
            }, 1500);
        });
    }

    static encounterGuardian() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const random = Math.random();
                if (random < 0.5) {
                    reject("守护者太强大了，你被击退了!");
                }
                resolve({ message: "你巧妙地避开了守护者!", icon: "🥷" });
            }, 2000);
        });
    }

    static crossBridge() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const random = Math.random();
                if (random < 0.3) {
                    reject("吊桥断了，你掉进了深渊!");
                }
                resolve({ message: "小心翼翼地通过了吊桥...", icon: "🌉" });
            }, 2000);
        });
    }
}

// 使用 async/await 重写寻宝过程
async function findTreasure() {
    const steps = [];
    
    try {
        // 步骤1: 获取初始线索
        const clue = await TreasureMap.getInitialClue();
        steps.push(clue);
        console.log(clue.message);

        // 步骤2: 解码古文
        const location = await TreasureMap.decodeAncientScript(clue);
        steps.push(location);
        console.log(location.message);

        // 步骤3: 通过吊桥
        const bridge = await TreasureMap.crossBridge();
        steps.push(bridge);
        console.log(bridge.message);

        // 步骤4: 避开守护者
        const guardian = await TreasureMap.encounterGuardian();
        steps.push(guardian);
        console.log(guardian.message);

        // 步骤5: 搜索神庙
        const box = await TreasureMap.searchTemple(location);
        steps.push(box);
        console.log(box.message);

        // 步骤6: 解开谜题
        const puzzle = await TreasureMap.solvePuzzle();
        steps.push(puzzle);
        console.log(puzzle.message);

        // 步骤7: 打开宝箱
        const treasure = await TreasureMap.openTreasureBox();
        steps.push(treasure);
        console.log(treasure.message);

        return { success: true, steps, treasure: treasure.message };
    } catch (error) {
        console.error("任务失败:", error);
        return { success: false, steps, error };
    }
}

// 导出供 HTML 使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TreasureMap, findTreasure };
}