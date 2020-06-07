import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import Link from '@ckeditor/ckeditor5-link/src/link';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';

import ProductPreviewEditing from './components/ckeditor/ProductPreviewEditing';
import ProductList from './components/ProductList';
import ProductPreview from './components/ProductPreview';

export default function App() {
  const [editor, setEditor] = useState(null);
  const [editorData, setEditorData] = useState(
    `<section class="product" data-id="1" />`,
  );

  const editorConfig = {
    plugins: [
      // A set of editor features to be enabled and made available to the user.
      Essentials,
      Heading,
      Bold,
      Italic,
      Underline,
      Link,
      Paragraph,
      Table,
      TableToolbar,

      // Your custom plugin implementing the widget is loaded here.
      ProductPreviewEditing,
    ],
    toolbar: [
      'heading',
      '|',
      'bold',
      'italic',
      'underline',
      '|',
      'link',
      'insertTable',
      '|',
      'undo',
      'redo',
    ],
    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
    },
    products: {
      productRenderer: (id, domElement) => {
        const product = products.find((product) => product.id === id);
        ReactDOM.render(<ProductPreview id={id} {...product} />, domElement);
      },
    },
  };

  const handleEditorDataChange = (evt, editor) => {
    setEditorData(editor.getData());
  };

  const handleEditorInit = (editor) => {
    setEditor(editor);
    setEditorData(editor.getData());
  };

  const products = [
    {
      id: 1,
      name: 'Colors of summer in Poland',
      price: '$1500',
      image: 'assets/product1.jpg',
    },
    {
      id: 2,
      name: 'Mediterranean sun on Malta',
      price: '$1899',
      image: 'assets/product2.jpg',
    },
    {
      id: 3,
      name: 'Tastes of Asia',
      price: '$2599',
      image: 'assets/product3.jpg',
    },
    {
      id: 4,
      name: 'Exotic India',
      price: '$2200',
      image: 'assets/product4.jpg',
    },
  ];

  return (
    <div className="app">
      <div className="app__offer-editor" key="offer-editor">
        <h3>Product offer editor</h3>
        <CKEditor
          editor={ClassicEditor}
          data={editorData}
          config={editorConfig}
          onChange={handleEditorDataChange}
          onInit={handleEditorInit}
        />

        <h3>Editor data</h3>
        <textarea value={editorData} readOnly={true}></textarea>
      </div>

      <ProductList
        key="product-list"
        products={products}
        onClick={(id) => {
          editor.execute('insertProduct', id);
          editor.editing.view.focus();
        }}
      />
    </div>
  );
}
