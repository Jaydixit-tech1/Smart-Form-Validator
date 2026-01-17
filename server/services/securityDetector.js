class SecurityDetector {
  detectThreats(value) {
    const threats = [];
    const str = String(value).toLowerCase();

    // XSS Detection
    if (this.detectXSS(str)) {
      threats.push({
        type: 'XSS',
        message: 'Potential Cross-Site Scripting (XSS) attack detected'
      });
    }

    // SQL Injection Detection
    if (this.detectSQLInjection(str)) {
      threats.push({
        type: 'SQL_INJECTION',
        message: 'Potential SQL injection attack detected'
      });
    }

    // Command Injection Detection
    if (this.detectCommandInjection(str)) {
      threats.push({
        type: 'COMMAND_INJECTION',
        message: 'Potential command injection attack detected'
      });
    }

    return threats;
  }

  detectXSS(value) {
    // Script tags
    if (/<script[\s>]/.test(value) || /<\/script>/.test(value)) {
      return true;
    }

    // JavaScript event handlers
    const eventHandlers = [
      'onerror', 'onload', 'onclick', 'onmouseover', 'onfocus',
      'onblur', 'onchange', 'onsubmit', 'onkeydown', 'onkeyup'
    ];
    if (eventHandlers.some(handler => new RegExp(`${handler}\\s*=`, 'i').test(value))) {
      return true;
    }

    // JavaScript protocol
    if (/javascript:/i.test(value)) {
      return true;
    }

    // Data URIs with scripts
    if (/data:text\/html/i.test(value)) {
      return true;
    }

    // Iframe tags
    if (/<iframe[\s>]/.test(value) || /<\/iframe>/.test(value)) {
      return true;
    }

    // Object/embed tags
    if (/<object[\s>]/.test(value) || /<embed[\s>]/.test(value)) {
      return true;
    }

    return false;
  }

  detectSQLInjection(value) {
    // SQL keywords in suspicious contexts
    const sqlKeywords = [
      'union select', 'union all select', 'select.*from', 'insert into',
      'update.*set', 'delete from', 'drop table', 'drop database',
      'alter table', 'create table', 'exec(', 'execute(',
      'xp_cmdshell', 'sp_executesql', '--', ';--', '/*', '*/',
      "' or '1'='1", "' or 1=1", "admin'--", "' union"
    ];

    for (const keyword of sqlKeywords) {
      const regex = new RegExp(keyword.replace(/\s+/g, '\\s+'), 'i');
      if (regex.test(value)) {
        return true;
      }
    }

    // Suspicious patterns
    if (/['"]\s*(or|and)\s*['"]?\d+['"]?\s*=\s*['"]?\d+/.test(value)) {
      return true;
    }

    return false;
  }

  detectCommandInjection(value) {
    // Command injection patterns
    const commandPatterns = [
      /;\s*(rm|del|delete|format|mkfs)/i,
      /;\s*(cat|type|more|less)\s+/i,
      /;\s*(wget|curl|nc|netcat)\s+/i,
      /\|\s*(rm|del|sh|bash|cmd|powershell)/i,
      /&&\s*(rm|del|sh|bash|cmd)/i,
      /\|\|\s*(rm|del|sh|bash|cmd)/i,
      /`[^`]*`/,
      /\$\([^)]+\)/,
      /\$\{[^}]+\}/,
      /<\([^>]+\)/,
      /;\s*ls\s/i,
      /;\s*pwd/i,
      /;\s*whoami/i,
      /;\s*id/i
    ];

    for (const pattern of commandPatterns) {
      if (pattern.test(value)) {
        return true;
      }
    }

    // Windows-specific commands
    if (/;\s*(dir|cd|copy|move|ren|attrib)/i.test(value)) {
      return true;
    }

    return false;
  }
}

module.exports = new SecurityDetector();
