require('../../../tests');
const {Section} = require('./Section');

describe('Section', () => {
    it('should create a section with the correct name and data', () => {
        const testSectionData = {
            header: 'Test Section',
            collapseControl: 'COLLAPSE_CONTROL_NONE',
            collapsible: false,
            numUncollapsibleWidgets: 0,
            widgets: []
        };
        const section = Section.createFromObject(testSectionData);
        expect(section).toBeInstanceOf(Section);
        expect(section.header).toBe(testSectionData.header);
        expect(section.collapseControl).toBe(testSectionData.collapseControl);
        expect(section.content).toBe(testSectionData.content);
    });
});