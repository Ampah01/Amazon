import { formatCurrency } from "../../scripts/utils/money.js";


describe('test suite: Format currency', () => {
  it('converts cents to dollar', () => {
    expect(formatCurrency(2000)).toEqual('20.00')
  })
  it('converts decimals cents to dollars',() => {
    expect(formatCurrency(2000.8)).toEqual('20.01')
  })
  it('works with 0',() => {
    expect(formatCurrency(0)).toEqual('0.00')
  })
});


