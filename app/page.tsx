import Button from '@mui/material/Button';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Button>Hello</Button>
      </main>
    </div>
  );
}
