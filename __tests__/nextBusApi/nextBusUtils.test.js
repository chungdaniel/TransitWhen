import { changeAgency } from '../../js/api/next_bus/nextBusUtils';

test('changeAgency', () => {
    expect(changeAgency('ttc')).toBe('&a=ttc');
});
