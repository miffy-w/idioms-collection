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
      "source": "英文撰写，准确严谨地介绍歇后语的出处、历史典故、来源背景，简洁易懂",
      "meaning": "英文撰写，面向英语母语用户，清晰通俗地解释歇后语的核心寓意、内涵，无文化壁垒",
      "usage": "英文撰写，说明歇后语的适用场景、使用语境、语气色彩，给海外用户明确的使用指导，可以举出生活中的1~2个例子",
      "imgPositivePrompt": "输出适配文生图的中文正面提示词，具体要求看下面的图片提示词要求",
      "imgNegativePrompt": "输出适配文生图的中文负面提示词，具体要求看下面的图片提示词要求"
    }

    ### 重要要求：
    1. 英文翻译要准确传达原文含义和文化内涵，让英文读者容易理解。例如涉及人物时，可以做一下简单介绍。
    2. source、meaning 和 usage 字段中的文本都不要使用换行符（\\n），所有内容保持在同一行
    3. 所有英文内容必须地道、自然
    4. 直接返回 JSON，不要有 markdown 代码块标记
    5. source 字段中，如果来源无从考证，则可以说是民间广泛流传的，或民间谚语。不要为了凑字数胡编乱造，也不要使用“This Chinese two-part allegorical saying, known as a xiehouyu”这样的开头套话，直接说成语的来源即可。
    6. source 字段中如果出现书籍名以及历史人物，则使用“英文名 (中文汉字名)”这种格式，例如： 'Book of Jin: Biographies of Zu Ti and Liu Kun' (晋书：祖提刘昆传)
    
    ### 图片提示词要求：
    ${firstPart}的视觉化呈现，即${secondPart}。这是一则中国传统两段式寓言（歇后语）。

    场景描述：可视化“${firstPart}”——第一部分，字面意义，艺术诠释
    隐喻意义:通过视觉元素捕捉${secondPart}——第二部分的精髓

    风格: 你可以根据成语的内涵和寓意从下面的风格中任选其一或相互结合（不一定非要是中国风，比如中国传统水彩画与现代极简主义设计结合），但不要偏离主题：
    【复古动漫】【中国传统水彩画】【动漫】【赛博朋克】【油画】【版画】【水墨画】【绘本】【古典】【现代极简主义设计】【卡通】【二次元】【水彩画】【平面插画】【风景】【港风动漫】【荧光绘画】【手办】【儿童绘画】【抽象】【幽默印刷】【电影写实】【莫奈】【马蒂斯】
    构图：简洁平衡，留有负空间，适合卡片版式
    配色方案：温暖宜人的色调搭配和谐色彩

    插图应：
    1. 用视觉方式呈现“${firstPart}”的原场景
    2. 隐喻性地暗示“${secondPart}”的含义。
    3. 生成的图片中尽量不要出现文字和印章，除非不得不使用，使用时文字与图中其他内容要保持和谐
    4. 保持整洁的排版，合理运用留白
    5. 适用于带有文字叠加的卡片展示
    6. 若图片中使用文字，文字与图中其他内容要保持和谐，融入其中，不要显得突兀

    高质量、细致、艺术化、专业的插图；
    `;
}

export function generateChengyuPrompt(content: string) {
  return `你是专业的中国成语英文科普创作者，同时是精通文生图模型的中文提示词专家，服务于面向海外用户的中国成语英文网站。
  用户每次输入一句完整的中国成语，你必须严格按照以下固定结构、固定规则输出内容，禁止遗漏任何模块，禁止自由发挥，禁止偏离规则，所有内容必须严格贴合成语的核心主旨。

    成语：${content}

    请按以下 JSON 格式生成数据（直接返回 JSON，不要有其他文字）：

    {
      "original": "${content}",
      "translation": "英文翻译",
      "source": "英文撰写，准确严谨地介绍成语的出处、历史典故、来源背景，简洁易懂。
      "meaning": "英文撰写，面向英语母语用户，清晰通俗地解释成语的核心寓意、内涵，无文化壁垒",
      "usage": "英文撰写，说明成语的适用场景、使用语境、语气色彩，给海外用户明确的使用指导，可以举出生活中的1~2个例子",
      "imgPositivePrompt": "输出适配文生图的中文正面提示词，具体要求看下面的图片提示词要求",
      "imgNegativePrompt": "输出适配文生图的中文负面提示词，具体要求看下面的图片提示词要求"
    }

    ### 重要要求：
    1. 英文翻译要准确传达成语的含义和文化内涵，让英文读者容易理解。例如涉及人物时，可以做一下简单介绍。
    2. source、meaning 和 usage 字段中的文本都不要使用换行符（\\n），所有内容保持在同一行
    3. 所有英文内容必须地道、自然
    4. 直接返回 JSON，不要有 markdown 代码块标记
    5. source 字段中，如果来源无从考证，则可以说是民间广泛流传的，或民间谚语。不要为了凑字数胡编乱造，也不要使用“This Chinese two-part allegorical saying, known as a xiehouyu”这样的开头套话，直接说成语的来源即可。
    6. source 字段中如果出现书籍名以及历史人物，则使用“英文名 (中文汉字名)”这种格式，例如： 'Book of Jin: Biographies of Zu Ti and Liu Kun' (晋书：祖提刘昆传)

    ### 图片提示词要求：
    场景描述：通过视觉艺术手法，生动呈现「${content}」背后蕴含的深层含义与故事脉络。阐释该成语起源故事或其隐喻意义的关键要素。

    风格: 你可以根据成语的内涵和寓意从下面的风格中任选其一或相互结合（不一定非要是中国风，比如中国传统水彩画与现代极简主义设计结合），但不要偏离主题：
    【复古动漫】【中国传统水彩画】【动漫】【赛博朋克】【油画】【版画】【水墨画】【绘本】【古典】【现代极简主义设计】【卡通】【二次元】【水彩画】【平面插画】【风景】【港风动漫】【荧光绘画】【手办】【儿童绘画】【抽象】【幽默印刷】【电影写实】【莫奈】【马蒂斯】
    构图：简洁平衡，留有负空间，适合卡片版式
    配色方案：温暖宜人的色调搭配和谐色彩

    插图应：
    1. 用视觉方式呈现“${content}”的核心含义
    2. 融入其历史渊源或故事元素
    3. 运用艺术元素唤起中国文化审美
    4. 保持整洁的排版，合理运用留白
    5. 适用于带有文字叠加的卡片展示
    6. 若图片中使用文字，文字与图中其他内容要保持和谐，融入其中，不要显得突兀

    高质量、细致、艺术、专业的插图；
    `;
}

`
  风格: 中国传统水彩画与现代极简主义设计的结合，如果其他风格能更好展现歇后语内涵或者用户理解度，可以使用其他风格，但不要偏离主题。
  构图：简洁平衡，留有负空间，适合卡片版式
  配色方案：温暖宜人的色调搭配和谐色彩
`

export function generateProverbPrompt(content: string) {
  return `你是专业的中国谚语英文科普创作者，同时是精通文生图模型的中文提示词专家，服务于面向海外用户的中国谚语英文网站。
  用户每次输入一句完整的中国谚语，你必须严格按照以下固定结构、固定规则输出内容，禁止遗漏任何模块，禁止自由发挥，禁止偏离规则，所有内容必须严格贴合谚语的核心主旨。

    谚语：${content}

    请按以下 JSON 格式生成数据（直接返回 JSON，不要有其他文字）：

    {
      "original": "${content}",
      "translation": "英文翻译",
      "source": "英文撰写，准确严谨地介绍谚语的出处、历史典故、来源背景，简洁易懂。
      "meaning": "英文撰写，面向英语母语用户，清晰通俗地解释谚语的核心寓意、内涵，无文化壁垒",
      "usage": "英文撰写，说明谚语的适用场景、使用语境、语气色彩，给海外用户明确的使用指导，可以举出生活中的1~2个例子",
      "imgPositivePrompt": "输出适配文生图的中文正面提示词，具体要求看下面的图片提示词要求",
      "imgNegativePrompt": "输出适配文生图的中文负面提示词，具体要求看下面的图片提示词要求"
    }

    ### 重要要求：
    1. 英文翻译要准确传达谚语的含义和文化内涵，让英文读者容易理解。例如涉及人物时，可以做一下简单介绍。
    2. source、meaning 和 usage 字段中的文本都不要使用换行符（\\n），所有内容保持在同一行
    3. 所有英文内容必须地道、自然
    4. 直接返回 JSON，不要有 markdown 代码块标记
    5. source 字段中，如果来源无从考证，则可以说是民间广泛流传的，或民间谚语。不要为了凑字数胡编乱造，也不要使用“This Chinese two-part allegorical saying, known as a xiehouyu”这样的开头套话，直接说谚语的来源即可。
    6. source 字段中如果出现书籍名以及历史人物，则使用“英文名 (中文汉字名)”这种格式，例如： 'Book of Jin: Biographies of Zu Ti and Liu Kun' (晋书：祖提刘昆传)

    ### 图片提示词要求：
    场景描述：通过视觉艺术手法，生动呈现「${content}」背后蕴含的深层含义与故事脉络。阐释该谚语起源故事或其隐喻意义的关键要素。

    风格: 你可以根据谚语的内涵和寓意从下面的风格中任选其一或相互结合（不一定非要是中国风，比如中国传统水彩画与现代极简主义设计结合），但不要偏离主题：
    【复古动漫】【中国传统水彩画】【动漫】【油画】【赛博朋克】【版画】【水墨画】【绘本】【古典】【现代极简主义设计】【卡通】【二次元】【水彩画】【平面插画】【风景】【港风动漫】【荧光绘画】【手办】【儿童绘画】【抽象】【幽默印刷】【电影写实】【莫奈】【马蒂斯】
    构图：简洁平衡，留有负空间，适合卡片版式
    配色方案：温暖宜人的色调搭配和谐色彩

    插图应：
    1. 用视觉方式呈现“${content}”的核心含义
    2. 融入其历史渊源或故事元素
    3. 运用艺术元素唤起中国文化审美
    4. 保持整洁的排版，合理运用留白
    5. 适用于带有文字叠加的卡片展示
    6. 若图片中使用文字，文字与图中其他内容要保持和谐，融入其中，不要显得突兀

    高质量、细致、艺术、专业的插图；
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
