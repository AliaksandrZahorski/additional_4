module.exports = function multiply(first, second) {
  const shiftToRegister = (str, shiftTo) => {
    return str + '0'.repeat(shiftTo);
  }

  const mul = (a, b, p) => {
    const x = Number(a);
    const y = Number(b);
    const p0 = Number(p);
    const result = x * y + p0;
    const stringResult = result > 9 ? '' + result : '0' + result;
    return {s: stringResult.charAt(1), p: stringResult.charAt(0)}
  }
  const add = (a, b, p) => {
    const x = Number(a);
    const y = Number(b);
    const p0 = Number(p);
    const result = x + y + p0;
    const stringResult = result > 9 ? '' + result : '0' + result;
    return {s: stringResult.charAt(1), p: stringResult.charAt(0)}
  }

  const stringToOneMul = (str, sym) => {
    let s, p, result = '';
    let p0 = '0';
    for (let i = str.length; i > 0; i--) {
      const a = str.charAt(i - 1);
      const b = sym;
      ({ s, p } = mul(a, b, p0));
      result = result + s;
      p0 = p;
    }
    return (p === '0' ? result : result + p).split('').reverse().join('');
  }

  const stringToStringAdd = (str, sym) => {
    let s, p, result = '';
    let p0 = '0';
    let sb, st;
    ([sb, st] = str.length > sym.length ? [str, sym] : [sym, str]);

    let shiftS2 = 0;
    for (let i = sb.length; i > 0; i--) {
      const a = sb.charAt(i - 1);
      const b = st.charAt(st.length - 1 - shiftS2++);
      ({ s, p } = add(a, b, p0));
      result = result + s;
      p0 = p;
    }
    return (p === '0' ? result : result + p).split('').reverse().join('');
  }

  const multiplicator = (s, s2) => {
    let result = '';
    let regShift = 0;
    for (let i = s2.length; i > 0; i--) {
      const a = s2.charAt(s2.length - 1 - regShift);
      const currentResult = stringToOneMul(s, a);

      result = stringToStringAdd(result, shiftToRegister(currentResult, regShift) );
      regShift++;

    }
    return result;
  }

return multiplicator(first, second);
}
