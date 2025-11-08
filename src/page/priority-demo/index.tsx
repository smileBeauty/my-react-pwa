import { useState, useCallback } from 'react';
import { unstable_runWithPriority, unstable_ImmediatePriority } from 'scheduler';

const PriorityDemo = () => {
  // 控制方块颜色（低优先级样式更新）
  const [boxColor, setBoxColor] = useState('red');
  // 记录任务状态
  const [status, setStatus] = useState('就绪：点击「改变颜色」触发低优先级任务，点击「执行高优先级任务」触发长任务');
  // 标记高优先级任务是否正在执行
  const [isHighPriorityRunning, setIsHighPriorityRunning] = useState(false);

  // 低优先级任务：仅更新方块颜色（样式更新）
  const handleLowPriority = useCallback(() => {
    console.log('低优先级任务：点击触发');
    setStatus('低优先级任务：尝试更新颜色...');
    // 切换颜色（触发样式更新）
    setBoxColor(prev => prev === 'red' ? 'green' : 'red');
    const start = performance.now();
    while (performance.now() - start < 4000) {
        // 空循环模拟计算（阻塞主线程）
        Math.random();
      }
    // 延迟确认状态（确保状态已入队）
    setTimeout(() => {
      setStatus('低优先级任务：颜色更新已入队（等待执行）');
    }, 0);
  }, []);

  // 高优先级任务：模拟计算密集型长任务（非用户输入）
  const handleHighPriority = useCallback(() => {
    console.log('高优先级任务：点击触发');
    if (isHighPriorityRunning) return;
    
    setIsHighPriorityRunning(true);
    setStatus('高优先级任务：开始执行（计算密集型）...');

    // 使用 React 调度器指定「立即优先级」（最高优先级）
    unstable_runWithPriority(unstable_ImmediatePriority, () => {
      // 模拟长任务（约 800ms，超过多帧时间）
      const start = performance.now();
      while (performance.now() - start < 8000) {
        // 空循环模拟计算（阻塞主线程）
        Math.random();
      }

      // 任务结束
      setIsHighPriorityRunning(false);
      setStatus('高优先级任务：执行完成，释放主线程');
    });
    console.log('高优先级任务：执行完成');
  }, [isHighPriorityRunning]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>高优先级任务阻塞样式更新演示</h2>
      
      {/* 样式更新的目标元素 */}
      <div 
        style={{
          width: '200px',
          height: '200px',
          backgroundColor: boxColor,
          margin: '20px 0',
        }}
      />
      
      <p style={{ color: '#333' }}>{status}</p>
      
      {/* 触发低优先级样式更新 */}
      <button 
        onClick={handleLowPriority}
        style={{ marginRight: '10px', padding: '8px 16px' }}
      >
        改变颜色（低优先级）
      </button>
      
      {/* 触发高优先级长任务 */}
      <button 
        onClick={handleHighPriority}
        style={{ 
          padding: '8px 16px',
          backgroundColor: isHighPriorityRunning ? '#ffcccc' : '#fff',
          cursor: isHighPriorityRunning ? 'not-allowed' : 'pointer'
        }}
        disabled={isHighPriorityRunning}
      >
        {isHighPriorityRunning ? '高优先级任务执行中...' : '执行高优先级长任务'}
      </button>
      
      <div style={{ marginTop: '20px', fontSize: '0.9em', color: '#666' }}>
        <p>操作步骤：</p>
        <ol>
          <li>先点击「改变颜色」，观察方块颜色4s变化（正常情况）</li>
          <li>再次点击「改变颜色」，然后<strong>立刻</strong>点击「执行高优先级长任务」</li>
          <li>观察到：高优先级任务执行期间（约8s），方块颜色没有变化，直到任务结束后才更新</li>
        </ol>
      </div>
    </div>
  );
};

export default PriorityDemo;
