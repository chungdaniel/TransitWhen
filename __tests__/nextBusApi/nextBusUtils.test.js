import { changeAgency } from '../../src/api/next_bus/nextBusUtils';

test('changeAgency', () => {
    expect(changeAgency('ttc')).toBe('&a=ttc');
});
