import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import WriteReviewModal from '../WriteReviewModal';
import { productReducer } from '@/redux/slices/productSlice';
import { useRouter } from 'next/navigation';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));


interface ComboboxOption {
  value: string;
  label: string;
}

interface ComboboxProps {
  placeholder: string;
  onChange: (option: ComboboxOption) => void;
  options: ComboboxOption[];
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    width,
    height,
    className
  }: {
    src: string;
    alt?: string;
    width?: number;
    height?: number;
    className?: string;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt || 'Product image'}
      width={width}
      height={height}
      className={className}
      data-testid="product-image"
    />
  ),
}));

// Mock Combobox component
jest.mock('@/components/common/Combobox', () => ({
  Combobox: ({ placeholder, onChange, options }: ComboboxProps) => (
    <div data-testid="mock-combobox">
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => onChange({ value: e.target.value, label: e.target.value })}
      />
      <div>
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option)}
            data-testid={`${placeholder}-option-${option.value}`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  ),
}));

// Mock Modal component
jest.mock('@/components/common/Modal', () => ({
  __esModule: true,
  default: ({ isOpen, onClose, children }: ModalProps) => (
    isOpen ? (
      <div data-testid="modal">
        <button onClick={onClose} aria-label="back">back</button>
        {children}
      </div>
    ) : null
  ),
}));

describe('WriteReviewModal', () => {
  const mockRouter = {
    push: jest.fn(),
  };

  const mockStore = configureStore({
    reducer: {
      product: productReducer,
    },
    preloadedState: {
      product: {
        preferences: [],
      },
    },
  });

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Basic Rendering Tests
  it('renders the write review button', () => {
    render(
      <Provider store={mockStore}>
        <WriteReviewModal />
      </Provider>
    );

    expect(screen.getByText('Write a new review')).toBeInTheDocument();
  });

  it('opens modal when write review button is clicked', () => {
    render(
      <Provider store={mockStore}>
        <WriteReviewModal />
      </Provider>
    );

    fireEvent.click(screen.getByText('Write a new review'));
    expect(screen.getByText('Select a product you currently use')).toBeInTheDocument();
  });

  it('shows both comboboxes in modal', () => {
    render(
      <Provider store={mockStore}>
        <WriteReviewModal />
      </Provider>
    );

    fireEvent.click(screen.getByText('Write a new review'));

    const comboboxes = screen.getAllByTestId('mock-combobox');
    expect(comboboxes).toHaveLength(2);
  });

  // Button State Tests
  it('shows Add another and Done buttons', () => {
    render(
      <Provider store={mockStore}>
        <WriteReviewModal />
      </Provider>
    );

    fireEvent.click(screen.getByText('Write a new review'));
    expect(screen.getByText('Add another')).toBeInTheDocument();
    expect(screen.getByText('Done')).toBeInTheDocument();
  });

  it('Add another button is initially disabled', () => {
    render(
      <Provider store={mockStore}>
        <WriteReviewModal />
      </Provider>
    );

    fireEvent.click(screen.getByText('Write a new review'));
    expect(screen.getByText('Add another')).toBeDisabled();
  });

  // Product Selection Tests
  it('enables Add another button when brand and product are selected with reaction', () => {
    render(
      <Provider store={mockStore}>
        <WriteReviewModal />
      </Provider>
    );

    fireEvent.click(screen.getByText('Write a new review'));

    // Select brand
    fireEvent.click(screen.getByTestId('Select brand-option-1')); // Sensibio

    // Select product
    fireEvent.click(screen.getByTestId('Select product-option-1')); // Sensibio H2O Micellar Water

    // Select reaction
    const likeButton = screen.getAllByText('🥰')[0];
    fireEvent.click(likeButton);

    expect(screen.getByText('Add another')).not.toBeDisabled();
  });

  // Navigation Tests
  it('navigates to skin matches page when Done is clicked', () => {
    render(
      <Provider store={mockStore}>
        <WriteReviewModal />
      </Provider>
    );

    fireEvent.click(screen.getByText('Write a new review'));
    fireEvent.click(screen.getByText('Done'));

    expect(mockRouter.push).toHaveBeenCalledWith('/find-products/your-skin-matches');
  });

  // Modal Close Tests
  it('closes modal when back button is clicked', async () => {
    render(
      <Provider store={mockStore}>
        <WriteReviewModal />
      </Provider>
    );

    // Open modal
    fireEvent.click(screen.getByText('Write a new review'));
    expect(screen.getByTestId('modal')).toBeInTheDocument();

    // Close modal
    fireEvent.click(screen.getByLabelText('back'));
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  // Preference Limit Tests
  it('disables Add another button when maximum preferences are reached', () => {
    const storeWithMaxPreferences = configureStore({
      reducer: {
        product: productReducer,
      },
      preloadedState: {
        product: {
          preferences: [
            { id: '1', productId: '1', productImage: '/test1.png', reaction: 'like' },
            { id: '2', productId: '2', productImage: '/test2.png', reaction: 'like' },
            { id: '3', productId: '3', productImage: '/test3.png', reaction: 'like' },
          ],
        },
      },
    });

    render(
      <Provider store={storeWithMaxPreferences}>
        <WriteReviewModal />
      </Provider>
    );

    fireEvent.click(screen.getByText('Write a new review'));
    expect(screen.getByText('Add another')).toBeDisabled();
  });
});
