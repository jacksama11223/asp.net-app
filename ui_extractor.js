/**
 * UI EXTRACTOR FOR FIGMA AI / LLM
 * Copy toàn bộ script này và dán vào Browser Console trên trang bạn muốn copy UI.
 * Script sẽ quét DOM và xuất ra cấu trúc phân cấp, màu sắc, font chữ.
 */

(function extractUIForFigma() {
    console.log("🚀 Bắt đầu quét giao diện...");

    const getStyles = (element) => {
        const computed = window.getComputedStyle(element);
        return {
            bgColor: computed.backgroundColor,
            color: computed.color,
            fontSize: computed.fontSize,
            fontWeight: computed.fontWeight,
            fontFamily: computed.fontFamily.split(',')[0].replace(/"/g, ''),
            padding: computed.padding,
            margin: computed.margin,
            borderRadius: computed.borderRadius,
            display: computed.display,
            flexDirection: computed.flexDirection
        };
    };

    const isVisible = (element) => {
        const style = window.getComputedStyle(element);
        return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
    };

    const rgbToHex = (rgb) => {
        const match = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (!match) return rgb;
        return "#" + match.slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('');
    };

    const palette = new Set();
    const fonts = new Set();

    const traverseDOM = (node, depth = 0) => {
        if (node.nodeType !== Node.ELEMENT_NODE) return null;
        if (!isVisible(node)) return null;

        const tagName = node.tagName.toLowerCase();
        if (['script', 'style', 'noscript', 'meta', 'link', 'svg', 'path'].includes(tagName)) return null;

        const styles = getStyles(node);
        const hexBg = rgbToHex(styles.bgColor);
        const hexColor = rgbToHex(styles.color);

        if (hexBg !== '#000000' && hexBg !== 'rgba(0, 0, 0, 0)') palette.add(hexBg);
        palette.add(hexColor);
        fonts.add(styles.fontFamily);

        let content = '';
        if (node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE) {
            content = node.textContent.trim().substring(0, 50); // Lấy 50 ký tự đầu
        }

        const cleanClass = Array.from(node.classList).join(' ').trim();

        const elementData = {
            element: tagName,
            ...(cleanClass && { classes: cleanClass }),
            ...(content && { text: content }),
            styles: {
                color: hexColor,
                bg: hexBg !== 'rgba(0, 0, 0, 0)' ? hexBg : 'transparent',
                font: `${styles.fontWeight} ${styles.fontSize} ${styles.fontFamily}`,
                shape: `Radius: ${styles.borderRadius}, Padding: ${styles.padding}`
            },
            children: []
        };

        for (const child of node.childNodes) {
            const childData = traverseDOM(child, depth + 1);
            if (childData) elementData.children.push(childData);
        }

        // Tối ưu JSON: Bỏ children nếu mảng rỗng
        if (elementData.children.length === 0) delete elementData.children;

        return elementData;
    };

    const bodyData = traverseDOM(document.body);

    const result = {
        meta: {
            title: document.title,
            url: window.location.href,
            viewport: `${window.innerWidth}x${window.innerHeight}`
        },
        designTokens: {
            colorPalette: Array.from(palette),
            typography: Array.from(fonts)
        },
        structure: bodyData
    };

    const jsonOutput = JSON.stringify(result, null, 2);
    
    console.log("✅ Đã quét xong! Hãy copy dòng text bên dưới để đưa cho ChatGPT / Figma AI / v0.dev");
    console.log("=========================================");
    console.log(`Bạn là một chuyên gia UI/UX Designer và React Developer.
Hãy tái tạo lại giao diện này bằng React + Tailwind CSS dựa trên cấu trúc DOM và Design Tokens sau đây.
Thiết kế phải đẹp, hiện đại (Premium SaaS), áp dụng các màu sắc và font chữ trong bảng màu một cách hợp lý.

DATA:
${jsonOutput}`);
    console.log("=========================================");
    
    // Tự động copy vào clipboard (nếu trình duyệt hỗ trợ)
    try {
        navigator.clipboard.writeText(jsonOutput);
        console.log("📋 Dữ liệu JSON đã được copy tự động vào Clipboard!");
    } catch (e) {
        console.log("Vui lòng tự copy phần DATA ở trên.");
    }
})();
