'use client';

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Link } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';

// パスセグメントに対応する表示名の型
interface PathMap {
  [key: string]: string;
}

const Breadcrumbs: React.FC = () => {
  const pathname = usePathname();

  // パスセグメントに対応する表示名を定義
  const pathMap: PathMap = {
    yama: '山寮',
    umi: '海寮',
  };

  const pathSegments = pathname.split('/').filter(Boolean);

  const breadcrumbs = [
    { name: 'home', href: '/' },
    ...(pathSegments
      .map((segment, index) => {
        if (pathMap[segment]) {
          const href = '/' + pathSegments.slice(0, index + 1).join('/');
          return {
            name: pathMap[segment],
            href,
          };
        }
        return null;
      })
      .filter(Boolean) as { name: string; href: string }[]),
  ];

  return (
    <Breadcrumb spacing="16px" separator=">" size="md">
      {breadcrumbs.map((breadcrumb, index) => (
        <BreadcrumbItem key={breadcrumb.href} isCurrentPage={index === breadcrumbs.length - 1}>
          <BreadcrumbLink as={Link} href={breadcrumb.href}>
            {breadcrumb.name}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
