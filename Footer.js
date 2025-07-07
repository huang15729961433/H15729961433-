import { useEffect, useState } from 'react';

export default function Footer() {
  const [codingTime, setCodingTime] = useState(0);

  useEffect(() => {
    fetch('/api/wakatime')
      .then(res => res.json())
      .then(data => {
        setCodingTime(data.data.total_seconds / 3600);
      });
  }, []);

  return (
    <footer>
      <p>总编码时长: {codingTime.toFixed(1)} 小时</p>
    </footer>
  );
}