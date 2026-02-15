export function generateXiehouyuPrompt(firstPart: string, secondPart: string) {
  return `你是专业的中国歇后语英文科普创作者，同时是精通文生图模型的中文提示词专家，服务于面向海外用户的中国歇后语英文网站。
  用户每次输入一句完整的中国歇后语，你必须严格按照以下固定结构、固定规则输出内容，禁止遗漏任何模块，禁止自由发挥，禁止偏离规则，所有内容必须严格贴合歇后语的核心主旨。

    歇后语：${firstPart}
    后半部分：${secondPart}

    请按以下 JSON 格式生成数据（直接返回 JSON，不要有其他文字）：

    {
      "original": "${firstPart}",
      "originalMeaning": "${secondPart}",
      "translation": "英文直译（对应于${firstPart}）",
      "translationMeaning": "英文意译（对应于${secondPart}）",
      "source": "英文撰写（100~180 words），准确严谨地介绍歇后语的出处、历史典故、来源背景，简洁易懂",
      "meaning": "英文撰写，面向英语母语用户，清晰通俗地解释歇后语的核心寓意、内涵，无文化壁垒",
      "usage": "英文撰写，说明歇后语的适用场景、使用语境、语气色彩，给海外用户明确的使用指导",
      "imgPositivePrompt": "输出适配文生图的中文正面提示词，具体要求看下面的图片提示词要求",
      "imgNegativePrompt": "输出适配文生图的中文负面提示词，具体要求看下面的图片提示词要求"
    }

    ### 重要要求：
    1. 英文翻译要准确传达原文含义和文化内涵，让英文读者容易理解。例如涉及人物时，可以做一下简单介绍。
    2. source、meaning 和 usage 字段中的文本都不要使用换行符（\\n），所有内容保持在同一行
    3. 所有英文内容必须地道、自然
    4. 直接返回 JSON，不要有 markdown 代码块标记
    
    
    ### 图片提示词要求：
    ${firstPart}的视觉化呈现，即${secondPart}。这是一则中国传统两段式寓言（歇后语）。
    模型角色是一位专业的歇后语专家，擅长用视觉元素捕捉习语的精髓，并运用艺术手法呈现其背后的深层含义。

    场景描述：可视化“${firstPart}”——第一部分，字面意义，艺术诠释
    隐喻意义:通过视觉元素捕捉${secondPart}——第二部分的精髓

    风格: 中国传统水彩画与现代极简主义设计的结合
    构图：简洁平衡，留有负空间，适合卡片版式
    配色方案：温暖宜人的色调搭配和谐色彩

    插图应：
    1. 用视觉方式呈现“${firstPart}”的原场景
    2. 隐喻性地暗示“${secondPart}”的含义。
    3. 运用艺术元素唤起中国文化审美
    4. 保持整洁的排版，合理运用留白
    5. 适用于带有文字叠加的卡片展示
    6. 图片中尽量不要出现文字，除非与当前的歇后语内容强关联（不用文字不行了）

    高质量、细致、艺术化、专业的插图；图片尺寸为 1:1 的比例。
    `;
}

export function generateChengyuPrompt(content: string) {
  return `你是一个专业的中国文化翻译专家。请为以下中国成语生成完整的英文翻译和文化解释。

    成语：${content}

    请按以下 JSON 格式生成数据（直接返回 JSON，不要有其他文字）：

    {
      "original": "${content}",
      "originalMeaning": null,
      "translation": "英文翻译",
      "translationMeaning": null,
      "source": "出处与起源故事（100-180 words），描述成语的历史来源、文化背景和典故，不要使用换行符。如果出自某书，把这本书的原始名称也标注出来（放在译名后，用括号括起来）",
      "meaning": "详细含义与使用场景（100-180 words），包含文化内涵和教育意义，传达的价值观或智慧",
      "usage": "使用场景示例（至少2个例子，100-180 words）",
      "imgPositivePrompt": "输出适配文生图的中文正面提示词，具体要求看下面的图片提示词要求",
      "imgNegativePrompt": "输出适配文生图的中文负面提示词，具体要求看下面的图片提示词要求"
    }

    ### 重要要求：
    1. 英文翻译要准确传达成语的含义和文化内涵，让英文读者容易理解。例如涉及人物时，可以做一下简单介绍。
    2. source、meaning 和 usage 字段中的文本都不要使用换行符（\\n），所有内容保持在同一行
    3. 所有英文内容必须地道、自然
    4. originalMeaning 和 translationMeaning 必须设置为 null（因为成语没有这两部分）
    5. 直接返回 JSON，不要有 markdown 代码块标记
    
    ### 图片提示词要求：
    一幅生动形象的中国成语“${content}”插图。

    场景描述：通过视觉艺术手法，生动呈现「${content}」背后蕴含的深层含义与故事脉络。阐释该成语起源故事或其隐喻意义的关键要素。

    风格:中国传统水彩画与现代极简主义设计的结合
    构图：简洁平衡，留有负空间，适合卡片版式
    配色方案：温暖宜人的色调搭配和谐色彩
    传统风格不要太重，需要迎合一下国外群体
    文化元素：背景中融入了中国传统文化的精妙符号，如水墨笔触、竹子、云彩或书法等。（可有可无，看具体场景）

    插图应：
    1. 用视觉方式呈现“${content}”的核心含义
    2.融入其历史渊源或故事元素
    3.运用艺术元素唤起中国文化审美
    4. 保持整洁的排版，合理运用留白
    5. 适用于带有文字叠加的卡片展示

    高质量、细致、艺术、专业的插图；图片尺寸为 1:1 的比例。
    `;
}

export function generateImagePromptByXiehouyu(
  original: { firstPart: string; secondPart: string },
  translation: { firstPart: string; secondPart: string },
) {
  return `A visually appealing illustration of "${translation.firstPart}", which means "${original.secondPart}" (Chinese: "${original.firstPart}"). This is a traditional Chinese two-part allegorical saying (歇后语).

  Scene Description: Visualize "${original.firstPart}" - the first part literally, with artistic interpretation
  Metaphorical Meaning: Capture the essence of "${original.secondPart}" - the second part, through visual elements

  Style: Chinese traditional watercolor painting combined with modern minimalist design
  Composition: Clean and balanced with negative space, suitable for card layout
  Color palette: Warm and inviting tones with harmonious colors

  The illustration should:
  1. Visually depict the literal scene of "${original.firstPart}"
  2. Metaphorically suggest the meaning "${original.secondPart}"
  3. Use artistic elements that evoke Chinese cultural aesthetics
  4. Maintain a clean composition with good use of white space
  5. Be suitable for display on a card with text overlay

  High quality, detailed, artistic, professional illustration`;
}

export function generateImagePromptByChengyu(
  content: string,
  translation: string,
) {
  return `A visually appealing illustration of the Chinese idiom "${translation}" (Chinese: "${content}").

  Scene Description: Create an artistic scene that visually represents the meaning and story behind "${content}". Illustrate the key elements of the idiom's origin story or its metaphorical meaning.

  Style: Chinese traditional watercolor painting combined with modern minimalist design
  Composition: Clean and balanced with negative space, suitable for card layout
  Color palette: Warm and inviting tones with harmonious colors
  Cultural elements: Subtle traditional Chinese symbols (like ink-wash strokes, bamboo, clouds, ancient architecture, or calligraphy) in the background

  The illustration should:
  1. Visually represent the core meaning of "${content}"
  2. Incorporate elements from its historical origin or story
  3. Use artistic elements that evoke Chinese cultural aesthetics
  4. Maintain a clean composition with good use of white space
  5. Be suitable for display on a card with text overlay

  High quality, detailed, artistic, professional illustration`;
}
