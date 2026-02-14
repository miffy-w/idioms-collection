export function generateXiehouyuPrompt(firstPart: string, secondPart: string) {
  return `你是一个专业的中国文化翻译专家。请为以下中国歇后语生成完整的英文翻译和文化解释。

    歇后语：${firstPart}
    后半部分：${secondPart}

    请按以下 JSON 格式生成数据（直接返回 JSON，不要有其他文字）：

    {
        "original": "${firstPart}",
        "originalMeaning": "${secondPart}",
        "translation": "英文直译（对应于${firstPart}）",
        "translationMeaning": "英文意译（表达的文化内涵，对应于${secondPart}）",
        "source": "出处与起源故事（100-200 words），描述歇后语的历史来源、文化背景和说明为什么会有这个说法，不要使用换行符。如果出自某书，把这本书的原始名称也标注出来（放在译名后，用括号括起来）",
        "meaning": "详细含义与使用场景（100-200 words），包含文化内涵和教育意义，传达的价值观或智慧",
        "usage": "使用场景示例（至少2个例子，100-200 words）"
    }

    重要要求：
    1. 英文翻译要准确传达原文含义和文化内涵
    2. source、meaning 和 usage 字段中的文本都不要使用换行符（\\n），所有内容保持在同一行
    3. 所有英文内容必须地道、自然
    4. 直接返回 JSON，不要有 markdown 代码块标记`;
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
    "source": "出处与起源故事（100-200 words），描述成语的历史来源、文化背景和典故，不要使用换行符。如果出自某书，把这本书的原始名称也标注出来（放在译名后，用括号括起来）",
    "meaning": "详细含义与使用场景（100-200 words），包含文化内涵和教育意义，传达的价值观或智慧",
    "usage": "使用场景示例（至少2个例子，100-200 words）"
    }

    重要要求：
    1. 英文翻译要准确传达成语的含义和文化内涵
    2. source、meaning 和 usage 字段中的文本都不要使用换行符（\\n），所有内容保持在同一行
    3. 所有英文内容必须地道、自然
    4. originalMeaning 和 translationMeaning 必须设置为 null（因为成语没有这两部分）
    5. 直接返回 JSON，不要有 markdown 代码块标记`;
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
    Cultural elements: Subtle traditional Chinese symbols (like ink-wash strokes, bamboo, clouds, or calligraphy) in the background

    The illustration should:
    1. Visually depict the literal scene of "${original.firstPart}"
    2. Metaphorically suggest the meaning "${original.secondPart}"
    3. Use artistic elements that evoke Chinese cultural aesthetics
    4. Maintain a clean composition with good use of white space
    5. Be suitable for display on a card with text overlay

    High quality, detailed, artistic, professional illustration`;
}

export function generateImagePromptByChengyu(content: string, translation: string) {
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
