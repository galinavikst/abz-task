import styles from "./page.module.scss";
import Hero from "./components/hero/Hero";
import GetSection from "./components/getSection/GetSection";
import PostSection from "./components/postSection/PostSection";

export default function Home() {
  return (
    <main className={styles.main}>
      {/* <Hero /> */}
      {/* <GetSection /> */}
      <PostSection />
    </main>
  );
}
