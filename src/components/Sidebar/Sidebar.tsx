import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';
import { LayoutDashboard, Target, Receipt, TrendingUp, TrendingDown } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/metas', label: 'Metas', icon: Target },
    { path: '/transacoes', label: 'Transações', icon: Receipt },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <TrendingUp size={28} />
        <span>FinTech</span>
      </div>
      <nav className={styles.nav}>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className={styles.footer}>
        <TrendingDown size={16} />
        <small>v1.0 - Controle total</small>
      </div>
    </aside>
  );
};

export default Sidebar;