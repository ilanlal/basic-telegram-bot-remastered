class Section {
    get header() {
        return this._header;
    }

    get collapseControl() {
        return this._collapseControl;
    }

    get collapsible() {
        return this._collapsible;
    }

    get numUncollapsibleWidgets() {
        return this._numUncollapsibleWidgets;
    }

    get widgets() {
        return this._widgets;
    }

    constructor() {
        this._header = '';
        this._collapseControl = null; // 'COLLAPSE_CONTROL_NONE' | 'COLLAPSE_CONTROL_HEADER' | 'COLLAPSE_CONTROL_FOOTER'
        this._collapsible = false;
        this._numUncollapsibleWidgets = 0;
        this._widgets = [];
    }

    setHeader(header) {
        this._header = header;
        return this;
    }

    setCollapseControl(collapseControl) {
        this._collapseControl = collapseControl;
        return this;
    }

    setCollapsible(collapsible) {
        this._collapsible = collapsible;
        return this;
    }

    setNumUncollapsibleWidgets(num) {
        this._numUncollapsibleWidgets = num;
        return this;
    }

    addWidget(widget) {
        this._widgets.push(widget);
        return this;
    }

    static create() {
        return new Section();
    }

    static createFromObject(sectionObject) {
        const section = Section.create()
            .setHeader(sectionObject.header || '')
            .setCollapseControl(sectionObject.collapseControl || null)
            .setCollapsible(sectionObject.collapsible || false)
            .setNumUncollapsibleWidgets(sectionObject.numUncollapsibleWidgets || 0);

        if (Array.isArray(sectionObject.widgets)) {
            sectionObject.widgets.forEach(widget => {
                section.addWidget(widget);
            });
        }

        return section;
    }
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = { Section };
}