import nextBusApi, { changeAgency } from '../../src/api/next_bus/nextBusApi';

beforeEach(() => {
    changeAgency('ttc');
});

test('changeAgency', () => {
    expect(changeAgency('ttc')).toBe('&a=ttc');
});
