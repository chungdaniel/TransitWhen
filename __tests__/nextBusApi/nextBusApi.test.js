import nextBusApi, { changeAgency } from '../../js/api/next_bus/nextBusAPI';

beforeEach(() => {
    changeAgency('ttc');
});

test('changeAgency', () => {
    expect(changeAgency('ttc')).toBe('&a=ttc');
});
