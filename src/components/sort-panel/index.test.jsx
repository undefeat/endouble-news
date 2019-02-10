import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import shallow from 'react-test-renderer/shallow';
import SortPanel from '.';

// eslint-disable-next-line
class SortPanelWrapped extends React.Component {
    // eslint-disable-next-line
    render() {
        return <SortPanel {...this.props} />;
    }
}

describe('SortPanel', () => {
    it('should correctly render', () => {
        const tree = shallow
            .createRenderer()
            .render(<SortPanel sortBy="date" sortOptions={['date', 'source']} onSortByChanged={() => {}} />);

        expect(tree).toMatchSnapshot();
    });

    it('should call "onSortByChanged" when click', () => {
        const onSortByChanged = jest.fn();
        const element = ReactTestUtils.renderIntoDocument(
            // ReactTestUtils don't render functional components.
            <SortPanelWrapped sortBy="date" sortOptions={['date', 'source']} onSortByChanged={onSortByChanged} />,
        );

        const btn = ReactTestUtils.findRenderedDOMComponentWithClass(element, 'sort-panel__btn');

        ReactTestUtils.Simulate.click(btn);

        expect(onSortByChanged).toHaveBeenCalledTimes(1);
        expect(onSortByChanged).toHaveBeenCalledWith('source');
    });
});
