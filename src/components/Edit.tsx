import React, { useRef, useEffect } from 'react';
import { message as messageDialog, PageHeader, Input, Button } from 'antd';
import TextAreaType from 'rc-textarea'
import { FormOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea'
import Layout from './Layout';
import { BookReqType, BookType } from '../types';
import styles from './Edit.module.css';
import NotFoundContainer from '../containers/NotFoundContainer';

interface EditProps {
  book: BookType | undefined | null;
  loading: boolean;
  error: Error | null;
  edit: (book: BookReqType) => void;
  back: () => void;
  getBooks: () => void;
  logout: () => void;
  goHome:()=>void
}

const Edit: React.FC<EditProps> = ({
  book,
  loading,
  error,
  edit,
  getBooks,
  back,
  logout,
  goHome
}) => {
  const titleRef = useRef<Input>(null);
  const messageRef = useRef<TextAreaType>(null);
  const authorRef = useRef<Input>(null);
  const urlRef = useRef<Input>(null);

  useEffect(() => {
    getBooks();
  }, [getBooks]);

  useEffect(() => {
    if (error) {
      logout();
    }
  }, [error, logout]);
  
  if (book === null) {
    return <NotFoundContainer pageNumber={403} />
  }

  if (book === undefined) {
    return <NotFoundContainer pageNumber={404} />
      
  }
 

  return (
    <Layout>
      <PageHeader
        onBack={back}
        title={
          <div>
            <FormOutlined /> Edit Book
          </div>
        }
        subTitle="Edit Your Book"
        extra={[
          <Button
            key="1"
            type="primary"
            onClick={logout}
            className={styles.button_logout}
          >
            Logout
          </Button>,
        ]}
      />
    

      <div className={styles.edit}>
        <div className={styles.input_title}>
          Title
          <span className={styles.required}> *</span>
        </div>
        <div className={styles.input_area}>
          <Input
            placeholder="Title"
            ref={titleRef}
            defaultValue={book?.title || ''}
            className={styles.input}
          />
        </div>
        <div className={styles.input_comment}>
          Comment
          <span className={styles.required}> *</span>
        </div>
        <div className={styles.input_area}>
          <TextArea
            rows={4}
            placeholder="Comment"
            ref={messageRef}
            defaultValue={book?.message || ''}
            className={styles.input}
            style={{ minHeight: 100 }}
          />
        </div>
        <div className={styles.input_author}>Author</div>
        <div className={styles.input_area}>
          <Input
            placeholder="Author"
            ref={authorRef}
            defaultValue={book?.author || ''}
            className={styles.input}
          />
        </div>
        <div className={styles.input_url}>URL</div>
        <div className={styles.input_area}>
          <Input
            placeholder="URL"
            ref={urlRef}
            defaultValue={book?.url || ''}
            className={styles.input}
          />
        </div>
        <div className={styles.button_area}>
          <Button
            size="large"
            loading={loading}
            onClick={click}
            className={styles.button}
          >
            Update
          </Button>
          
          <Button
            size="large"
            loading={loading}
            onClick={goHome}
            className={styles.button_margin}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Layout>
  );
 
  
  function click() {
    const title = titleRef.current!.state.value;
    
    const message = messageRef.current!.resizableTextArea.props.value as string 
    const author = authorRef.current!.state.value;
    const url = urlRef.current!.state.value;
    
    if (
      title === '' ||
      message === '' ||
      author === '' ||
      url === ''
    ) {
      messageDialog.error('Please fill out all inputs');
      return;
    }
    if(book?.title ===title && book?.message ===message && book?.author ===author && book?.url ===url) {
      messageDialog.error('No information changed');
      return;
    }
    edit({
      title,
      message,
      author,
      url,
    });
  }
};
export default Edit;


