"use client";
import { ApiServiceInterface } from '@/lib/features/api-service/apiServiceInterface';
import { useApiServices } from '@/lib/features/api-service/apiServiceSelectors';
import { useFavoriteServices } from '@/lib/features/favorites/favoriteServiceSelectors';
import { useAppDispatch } from '@/lib/hook';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import ApiServiceCard from './apiServiceCard';
import { useI18n } from '../../../../../../../locales/client';
import { fetchApiServices } from '@/lib/features/api-service/apiServiceThunks';

const products = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  desc: `Description ${i + 1}`,
}));

export default function ApiServiceContainer() {
  const t = useI18n();
  const { apiServiceResponse, isLoadingServiceResponse } = useApiServices();
  const dispatch = useAppDispatch();
  const { favoriteServiceAdded, favoriteServiceDeleted } = useFavoriteServices()
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const [cardWidth, setCardWidth] = useState(0);

  const checkOverflow = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 0);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  const scrollByCard = (direction: 'left' | 'right') => {
    if (!scrollRef.current || cardWidth === 0) return;
    const offset = direction === 'right' ? cardWidth : -cardWidth;
    scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  useEffect(() => {  
    dispatch(fetchApiServices(4));
    const el = scrollRef.current;
    const card = cardRef.current;
    if (card) {
      const style = getComputedStyle(card);
      const gap = parseInt(style.marginRight || '0', 10);
      setCardWidth(card.offsetWidth + gap);
    }
    if (!el) return;
    checkOverflow();
    el.addEventListener('scroll', checkOverflow);
    window.addEventListener('resize', checkOverflow);
    return () => {
      el.removeEventListener('scroll', checkOverflow);
      window.removeEventListener('resize', checkOverflow);
    };  
  }, []);
  const router = useRouter();
    console.log("Fetching API services", apiServiceResponse);
  useEffect(() => {

    

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favoriteServiceAdded, favoriteServiceDeleted])

  return (
    <div style={{ position: 'relative', padding: '0 2rem' }}>
      {showLeft && (
        <Button
          icon={<LeftOutlined />}
          onClick={() => scrollByCard('left')}
          style={{
            color: "white"

          }}
        />
      )}

      {showRight && (
        <Button
          icon={<RightOutlined />}
          onClick={() => scrollByCard('right')}
          style={{
            color: "white"
          }}
        />
      )}

      <div
        ref={scrollRef}
        style={{
          overflowX: 'auto',
          display: 'flex',
          padding: '1rem 0',
          scrollBehavior: 'smooth',
        }}
      >
        { apiServiceResponse?.result !== undefined && (apiServiceResponse?.result?.map((row: ApiServiceInterface, index) => (
          <ApiServiceCard key={row.id} service={row} />

        )))}
      </div>
    </div>
  );
}
