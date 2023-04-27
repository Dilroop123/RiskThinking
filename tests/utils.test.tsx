import { getmarkerIcon, getMarkerColor } from '../src/app/utils/utils';

describe('Utils', () => {

    it('getmarkerIcon returns correctly', () => {
        expect(getmarkerIcon('green')).toStrictEqual(
            {
                path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z',
                fillColor: 'green',
                fillOpacity: 1,
                strokeColor: '#000',
                strokeWeight: 2,
                scale: 1
            });

    });

    it('getMarkerColor returns correctly', () => {
        expect(getMarkerColor('0.1')).toStrictEqual('green');
        expect(getMarkerColor('0.85')).toStrictEqual('teal');

    });
})