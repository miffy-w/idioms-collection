# 歇后语卡片数据与图片生成流程

## 工作流程概述

### 1. 图片生成
使用 AI 图像生成工具，根据歇后语的意境生成配图：
- **Prompt 策略**：描述歇后语的视觉意象 + 风格要求 + 构图建议
- **格式**：WebP，压缩质量 75%
- **尺寸**：根据布局需求调整
- **存储**：`/public/` 目录下，文件名格式 `YYYY-MM-DD_HH-MM-SS.webp`

### 2. 数据生成
根据歇后语内容，填写结构化数据，包含中英文翻译、文化背景、使用场景等。

---

## 批量生成提示词

```markdown
# 任务目标
为指定的中国歇后语（两段式民间谚语）生成完整的卡片数据结构和配图。

# 数据结构规范

为每个歇后语生成以下 JSON 格式的数据：

```json
{
  "id": 35,
  "original": "歇后语前半部分",
  "originalMeaning": "歇后语后半部分（双关语或答案）",
  "originalCountry": "歇后语对应国家，填写'China'即可",
  "translation": "英文直译",
  "translationMeaning": "英文意译（表达的文化内涵）",
  "imageUrl": "/YYYY-MM-DD_HH-MM-SS.webp",
  "source": "出处与起源故事（100-150 words）\n- 描述歇后语的历史来源\n- 解释背后的文化背景\n- 说明为什么会有这个说法\n- 必须用英文编写",
  "meaning": "详细含义与使用场景（100-150 words）\n- 文化内涵和教育意义\n- 传达的价值观或智慧\n- 必须用英文编写",
  "usage": "使用场景（100-150 words）\n- 具体使用场景示例\n- 必须用英文编写"
}
```

# 图片生成规范

## Prompt 模板
```
A visually appealing illustration of [歇后语前半部分的视觉化描述], showing [关键元素和意象]. Style: Chinese traditional watercolor painting combined with modern minimalist design. Color palette: warm and inviting tones. Composition: clean and balanced with negative space. The scene should capture the essence of [歇后语的核心含义], with subtle cultural elements in the background.
```

## Prompt 生成规则
1. **视觉化前半部分**：将歇后语的前半部分转化为具体画面
2. **融入后半部分**：用视觉元素暗示或隐喻后半部分的含义
3. **文化元素**：融入中国传统文化符号（如书法、传统建筑、自然元素）
4. **构图简洁**：留白充足，适合卡片布局
5. **色彩和谐**：使用温暖、柔和的色调，避免过于鲜艳刺眼

## 示例

### 输入：小葱拌豆腐——一清二白

**图片 Prompt**：
```
A visually appealing illustration of a traditional Chinese dish showing fresh green scallions mixed with white tofu on an elegant ceramic plate. The green scallions are finely chopped and scattered over the smooth white tofu cubes, creating a beautiful contrast of green and white. Style: Chinese traditional watercolor painting combined with modern minimalist design. Color palette: fresh green and pure white with subtle earth tones. Composition: top-down view with clean negative space around the plate. The scene should capture the essence of honesty and transparency, with subtle ink-wash style calligraphy elements in the background.
```

**数据输出**：
```json
{
  "id": 33,
  "chinese": "小葱拌豆腐",
  "chineseMeaning": "一清二白",
  "english": "Scallion and tofu salad",
  "englishMeaning": "Perfectly clear and white",
  "imageUrl": "/2026-02-14_12-34-55_01.webp",
  "source": "This idiom originates from Chinese cuisine and folk culture. A simple dish made of mixing fresh green scallions with white tofu creates a visually pleasing contrast of green and white. The idiom metaphorically describes a person or situation that is completely honest, transparent, and innocent, without any hidden motives or corruption.",
  "meaning": "This idiom celebrates honesty, transparency, and moral integrity. It teaches us the value of being open and straightforward in our dealings with others. It reminds us that simplicity and honesty are virtues that should be cherished, and that a clear conscience brings peace of mind.\n\nUsage: Use this idiom when praising someone for their honesty and transparency, or when describing a situation that is completely clear and aboveboard. For example, a government official known for their integrity, a business deal conducted with complete transparency, or someone who admits their mistakes openly."
}
```

### 输入：芝麻开花——节节高

**图片 Prompt**：
```
A visually appealing illustration of a sesame plant in full bloom, with flowers opening from bottom to top in ascending order. The plant shows multiple segments, each with white or pale purple flowers at different heights, clearly demonstrating the progressive blooming pattern. Style: Chinese traditional watercolor painting combined with modern minimalist design. Color palette: soft greens, whites, and pale purples with warm golden undertones. Composition: vertical orientation showing the plant's growth from bottom to top. The scene should capture the essence of steady progress and continuous growth, with subtle mountain silhouettes or cloud elements in the background to symbolize upward movement.
```

**数据输出**：
```json
{
  "id": 34,
  "chinese": "芝麻开花",
  "chineseMeaning": "节节高",
  "english": "Sesame flowers blooming",
  "englishMeaning": "Rising step by step",
  "imageUrl": "/2026-02-14_12-34-55_02.webp",
  "source": "This idiom originates from Chinese agriculture and folk observations. The sesame plant has a unique characteristic: as it grows, its flowers bloom from the bottom upward, with each segment producing flowers higher than the previous one. This visual metaphor describes steady progress and continuous improvement over time.",
  "meaning": "This idiom celebrates progress, growth, and steady advancement. It teaches us that success comes from continuous effort and that each step forward builds upon the previous one. It encourages perseverance and recognizes that steady, consistent progress leads to great achievements.\n\nUsage: Use this idiom when describing someone's career or life progress, or when wishing someone continued success and advancement. For example, a student getting better grades each semester, an employee receiving regular promotions, or a business steadily growing over the years."
}
```

# 工作流步骤

1. **接收输入**：用户提供一个或多个歇后语（格式："前半部分——后半部分"）
2. **生成数据**：
   - 为每个歇后语填写完整的 JSON 数据
   - 确保英译准确、文化背景清晰
   - `source` 字段关注起源和背景
   - `meaning` 字段包含价值观 + Usage 示例
3. **生成图片 Prompt**：
   - 根据视觉化规则构建英文 Prompt
   - 包含风格、构图、色彩要求
4. **图片处理**（如需要）：
   - 调用图像生成工具
   - 转换为 WebP 格式
   - 压缩至合理大小（100-400KB）
   - 保存到 `/public/` 目录
5. **输出结果**：
   - 返回完整的 JSON 数据数组
   - 包含图片路径引用

# 注意事项

- **文化准确性**：确保英文翻译和解释准确传达中国文化内涵
- **语言质量**：英文字段必须使用自然、地道的英文
- **教育价值**：`meaning` 字段要突出歇后语的教育意义
- **使用场景**：`Usage` 部分给出 2-3 个具体示例
- **ID 管理**：为每个新数据项分配递增的唯一 ID
- **图片命名**：使用时间戳 + 序号确保唯一性

# 现在开始

请根据上述规范，为以下歇后语生成完整的数据和图片 Prompt：

[在此处输入歇后语列表]
```

---

## 自动化工作流建议

### 方案 1：使用 Coze Workflow
1. 创建 Workflow，输入为歇后语列表
2. 第一步：LLM 生成 JSON 数据和图片 Prompt
3. 第二步：调用图像生成工具
4. 第三步：图片处理（格式转换、压缩）
5. 输出：完整的数据数组

### 方案 2：使用脚本 + API
1. 准备歇后语列表（CSV/JSON）
2. 脚本批量调用 LLM API 生成数据和 Prompt
3. 批量调用图像生成 API
4. 脚本处理图片并更新数据中的 `imageUrl`
5. 保存最终数据

### 方案 3：混合模式
1. LLM 批量生成数据和 Prompt
2. 手动审核和调整 Prompt
3. 批量生成图片
4. 手动挑选最佳图片
5. 更新数据并发布

需要我帮你实现具体的自动化脚本吗？