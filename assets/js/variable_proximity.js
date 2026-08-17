(() => {
  const DEFAULTS = {
    from: "'wght' 400, 'opsz' 9",
    to: "'wght' 1000, 'opsz' 40",
    radius: 120,
    falloff: 'linear'
  };

  const mousePosition = { x: 0, y: 0 };
  let hasPointer = false;
  const instances = [];
  let animationStarted = false;

  const updatePosition = (x, y) => {
    mousePosition.x = x;
    mousePosition.y = y;
    hasPointer = true;
  };

  const handleMouseMove = event => updatePosition(event.clientX, event.clientY);
  const handleTouchMove = event => {
    if (!event.touches[0]) return;
    updatePosition(event.touches[0].clientX, event.touches[0].clientY);
  };

  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('touchmove', handleTouchMove, { passive: true });

  const parseSettings = (fromSettings, toSettings) => {
    const parse = settingsStr =>
      new Map(
        settingsStr
          .split(',')
          .map(setting => setting.trim())
          .map(setting => {
            const [name, value] = setting.split(' ');
            return [name.replace(/['"]/g, ''), parseFloat(value)];
          })
      );

    const fromMap = parse(fromSettings);
    const toMap = parse(toSettings);

    return Array.from(fromMap.entries()).map(([axis, fromValue]) => ({
      axis,
      fromValue,
      toValue: toMap.get(axis) ?? fromValue
    }));
  };

  const calculateFalloff = (distance, radius, falloff) => {
    const norm = Math.min(Math.max(1 - distance / radius, 0), 1);
    switch (falloff) {
      case 'exponential':
        return norm ** 2;
      case 'gaussian':
        return Math.exp(-((distance / (radius / 2)) ** 2) / 2);
      case 'linear':
      default:
        return norm;
    }
  };

  const wrapTextNode = (node, fromSettings, letterRefs) => {
    const fragment = document.createDocumentFragment();
    const text = node.nodeValue || '';
    for (const char of text) {
      if (char.trim() === '') {
        fragment.appendChild(document.createTextNode(char));
        continue;
      }
      const span = document.createElement('span');
      span.className = 'variable-proximity-letter';
      span.textContent = char;
      span.style.fontVariationSettings = fromSettings;
      fragment.appendChild(span);
      letterRefs.push(span);
    }
    node.parentNode.replaceChild(fragment, node);
  };

  const buildLetters = (element, fromSettings) => {
    const plainText = element.textContent || '';
    element.textContent = plainText;

    const letterRefs = [];
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
      acceptNode: node => {
        if (!node.nodeValue || node.nodeValue.trim() === '') return NodeFilter.FILTER_REJECT;
        if (node.parentElement && node.parentElement.closest('script, style')) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    const textNodes = [];
    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }

    textNodes.forEach(node => wrapTextNode(node, fromSettings, letterRefs));
    return letterRefs;
  };

  const upsertInstance = target => {
    const existingIndex = instances.findIndex(instance => instance.target === target);
    if (existingIndex !== -1) {
      instances.splice(existingIndex, 1);
    }

    const fromSettings = target.dataset.fromSettings || DEFAULTS.from;
    const toSettings = target.dataset.toSettings || DEFAULTS.to;
    const radius = Number(target.dataset.radius || DEFAULTS.radius);
    const falloff = target.dataset.falloff || DEFAULTS.falloff;
    const parsedSettings = parseSettings(fromSettings, toSettings);
    const letterRefs = buildLetters(target, fromSettings);

    instances.push({
      target,
      letterRefs,
      parsedSettings,
      fromSettings,
      radius,
      falloff,
      lastPosition: { x: null, y: null }
    });
  };

  const animate = () => {
    instances.forEach((instance, index) => {
      if (!instance.target.isConnected) {
        instances.splice(index, 1);
        return;
      }

      if (!hasPointer) {
        return;
      }

      const { target, letterRefs, parsedSettings, fromSettings, radius, falloff, lastPosition } = instance;
      const rect = target.getBoundingClientRect();
      const currentX = mousePosition.x - rect.left;
      const currentY = mousePosition.y - rect.top;

      if (lastPosition.x === currentX && lastPosition.y === currentY) return;
      instance.lastPosition = { x: currentX, y: currentY };

      letterRefs.forEach(letter => {
        const letterRect = letter.getBoundingClientRect();
        const letterCenterX = letterRect.left + letterRect.width / 2 - rect.left;
        const letterCenterY = letterRect.top + letterRect.height / 2 - rect.top;
        const distance = Math.hypot(letterCenterX - currentX, letterCenterY - currentY);

        if (distance >= radius) {
          letter.style.fontVariationSettings = fromSettings;
          return;
        }

        const falloffValue = calculateFalloff(distance, radius, falloff);
        const newSettings = parsedSettings
          .map(({ axis, fromValue, toValue }) => {
            const interpolatedValue = fromValue + (toValue - fromValue) * falloffValue;
            return `'${axis}' ${interpolatedValue}`;
          })
          .join(', ');

        letter.style.fontVariationSettings = newSettings;
      });
    });

    requestAnimationFrame(animate);
  };

  const initVariableProximity = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const targets = Array.from(document.querySelectorAll('[data-variable-proximity]'));
    if (!targets.length) return;

    targets.forEach(target => {
      const fromSettings = target.dataset.fromSettings || DEFAULTS.from;
      if (getComputedStyle(target).fontVariationSettings === 'normal' && !target.dataset.fromSettings) {
        target.style.fontVariationSettings = fromSettings;
      }
      upsertInstance(target);
    });

    if (!animationStarted) {
      animationStarted = true;
      requestAnimationFrame(animate);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVariableProximity, { once: true });
  } else {
    initVariableProximity();
  }

  document.addEventListener('site:refresh', initVariableProximity);
})();
