import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import renderer from 'react-test-renderer';
import { Dashboard, mapDispatchToProps, ImageModal, AddItemModal } from '../';

describe('Testing dashboard route', () => {
  afterEach(cleanup);

  const store = createStore(() => ({
    auth: {
      isLoggedIn: false,
    },
    app: {
      isLoading: false,
    },
  }));

  it('Should match snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Dashboard
          isFetching={false}
          categories={[]}
          fetchCategoryList={jest.fn()}
          isLoggedIn={false}
        />
        ,
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should call api', () => {
    const mockFetchingData = jest.fn();

    const tree = renderer.create(
      <Provider store={store}>
        <Dashboard
          isFetching={false}
          categories={[]}
          isLoggedIn={false}
          fetchCategoryList={mockFetchingData}
        />
      </Provider>,
    );
    tree.update();

    expect(mockFetchingData).toHaveBeenCalled();
  });

  it('testing mapDispatchToProps', () => {
    const mockDispatchFunction = jest.fn();

    const mappedDistpachFunction = mapDispatchToProps(mockDispatchFunction);

    mappedDistpachFunction.fetchCategoryList();
    mappedDistpachFunction.addItem();

    expect(mockDispatchFunction).toHaveBeenCalled();
  });

  it('testing image modal snapshot', () => {
    const { asFragment } = render(
      <ImageModal
        data={{
          description: '',
          name: '',
          image_url: '',
        }}
        onClick={jest.fn()}
        isOpen
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('testing add item modal snapshot', () => {
    const { asFragment } = render(
      <AddItemModal
        data={{
          description: '',
          name: '',
          image_url: '',
        }}
        onClick={jest.fn()}
        isOpen
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
