require('../../../tests');
const EntityViewModel = require('./EntityViewModel');

describe('EntityViewModel.SheetWrapper', () => {
    beforeEach(() => {
        SpreadsheetStubConfiguration.reset();
    });

    it('should create an instance of SheetWrapper with new service instances', () => {
        const wrapper = EntityViewModel.SheetWrapper.create(
            SpreadsheetApp.getActiveSpreadsheet()
        );
        expect(wrapper).toBeDefined();
    });

    describe('SheetWrapper methods', () => {
        /** @type {EntityViewModel.SheetWrapper} */
        let wrapper;
        beforeEach(() => {
            wrapper = EntityViewModel.SheetWrapper.create(
                SpreadsheetApp.getActiveSpreadsheet()
            );
        });

        it('should get the active sheet based on sheetMeta', () => {
            const sheetMeta = {
                name: 'Test Sheet',
                columns: ['action', 'default', 'es', 'fr', 'ar', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ko', 'he'],
            };
            const activeSheet = wrapper.getSheet(sheetMeta);
            expect(activeSheet).toBeDefined();
            expect(activeSheet.getName()).toBe('Test Sheet');

        });

        it('should bind sample data to the active sheet', () => {
            const sheetMeta = {
                name: 'Test Sheet',
                columns: ['action', 'default', 'es', 'fr', 'ar', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ko', 'he'],
                sample_data: [
                    ['action1', 'default1', 'es1', 'fr1', 'ar1', 'de1', 'it1', 'pt1', 'ru1', 'zh1', 'ja1', 'ko1', 'he1'],
                    ['action2', 'default2', 'es2', 'fr2', 'ar2', 'de2', 'it2', 'pt2', 'ru2', 'zh2', 'ja2', 'ko2', 'he2'],
                ]
            };
            wrapper.bindSheetSampleData(sheetMeta);
            const activeSheet = wrapper.getSheet(sheetMeta);
            const dataRange = activeSheet.getDataRange();
            const values = dataRange.getValues();
            expect(values.length).toBeGreaterThanOrEqual(2);
            expect(values[0]).toEqual(sheetMeta.columns);
            expect(values[1]).toEqual(sheetMeta.sample_data[0]);
            expect(values[2]).toEqual(sheetMeta.sample_data[1]);
        });
    });
});