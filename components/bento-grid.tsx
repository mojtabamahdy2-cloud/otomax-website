'use client';

import React from 'react';
import { cn } from '@/lib/utils';

// Types for customization
export interface NotificationItem {
  id: string;
  type: 'event' | 'message' | 'payment' | 'signup';
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  time: string;
  color: string; // bg-blue-500, bg-pink-500, etc.
}

export interface BentoCardProps {
  id?: string;
  title: string;
  description: string;
  titleClassName?: string;
  descriptionClassName?: string;
  icon?: React.ReactNode | string;
  span?: 'full' | 'half' | 'wide';
  type?: 'default' | 'notifications' | 'calendar' | 'animated';
  color?: string;
  centered?: boolean;
  notifications?: NotificationItem[];
  children?: React.ReactNode;
}

// Main BentoGrid Component
export const BentoGrid = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    // ↕️ TO CHANGE DEFAULT CARD HEIGHT: edit `auto-rows-[200px]` below.
    // You can also override row height per-card using `row-span-2` or `min-h-[Xpx]` on a BentoCard className.
    <div className={cn('grid grid-cols-1 md:grid-cols-3 gap-4 grid-flow-row-dense', className)}>
      {children}
    </div>
  );
};

// Individual Card Component
export const BentoCard = ({
  className,
  title,
  description,
  titleClassName,
  descriptionClassName,
  icon,
  centered = false,
  span = 'half',
  notifications = [],
  children,
  id,
  type,
  color,
  ...props
}: BentoCardProps & React.HTMLAttributes<HTMLDivElement>) => {
  const [hoveredNotification, setHoveredNotification] = React.useState<string | null>(null);

  // ── Slide-in-from-top notification feed ──────────────────────────────────
  // `displayed` holds the 3 most recently seen notifications in display order.
  // `animKey` tracks which item is freshly entering (gets the slide-in class).
  const MAX_VISIBLE = 3;
  const intervalMs = 1800;
  const [displayed, setDisplayed] = React.useState<NotificationItem[]>(
    notifications.slice(0, MAX_VISIBLE)
  );
  const [newId, setNewId] = React.useState<string | null>(
    notifications[0]?.id ?? null
  );
  const cycleIdx = React.useRef(MAX_VISIBLE % (notifications.length || 1));

  React.useEffect(() => {
    if (notifications.length < 2) return;
    const timer = setInterval(() => {
      const next = notifications[cycleIdx.current];
      cycleIdx.current = (cycleIdx.current + 1) % notifications.length;
      setDisplayed(prev => [next, ...prev.slice(0, MAX_VISIBLE - 1)]);
      setNewId(next.id);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [notifications]);

  // Inject notification keyframes once into <head>
  React.useEffect(() => {
    const id = 'bento-notif-keyframes';
    if (document.getElementById(id)) return;
    const style = document.createElement('style');
    style.id = id;
    style.textContent = `
      @keyframes slideInFromTop {
        from { opacity: 0; transform: translateY(-36px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes pushDown {
        from { transform: translateY(-36px); }
        to   { transform: translateY(0); }
      }
      .notif-enter { animation: slideInFromTop 0.42s cubic-bezier(0.22,1,0.36,1) forwards; }
      .notif-push  { animation: pushDown 0.42s cubic-bezier(0.22,1,0.36,1) forwards; }
    `;
    document.head.appendChild(style);
  }, []);
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div
      className={cn(
        'relative group rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-4 transition-all duration-300 hover:shadow-lg hover:border-neutral-300 dark:hover:border-neutral-700 overflow-hidden',
        span === 'full' && 'md:col-span-3',
        span === 'half' && 'md:col-span-1',
        span === 'wide' && 'md:col-span-2',
        'animate-fade-in-up',
        className
      )}
      {...props}
    >
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 to-transparent dark:from-neutral-900 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

      {/* Custom injected background/interactive elements */}
      {children}

      {/* Content */}
      <div className={cn('relative z-10 h-full flex flex-col pointer-events-none', centered && 'items-center justify-center text-center')}>
        {/* Icon and Title */}
        {!notifications.length && (
          <div className={cn('space-y-4 pointer-events-auto', centered && 'flex flex-col items-center')}>
            {icon && (
              <div className="w-12 h-12 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-2xl transform group-hover:scale-110 transition-transform duration-300">
                {icon}
              </div>
            )}
            <div className={cn(centered && 'text-center')}>
              {/* 🔤 CARD TITLE FONT SIZE */}
              <h3 className={cn('font-semibold text-neutral-950 dark:text-white text-xl mb-1 leading-tight', titleClassName)}>{title}</h3>
              {/* 🔤 CARD DESCRIPTION FONT SIZE */}
              <p className={cn('text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed', descriptionClassName)}>{description}</p>
            </div>
          </div>
        )}

        {/* Animated Notifications List */}
        {notifications.length > 0 && (
          <div className="flex flex-col h-full pointer-events-auto">
            <div className="mb-3">
              {/* 🔤 NOTIFICATION CARD TITLE FONT SIZE */}
              <h3 className={cn('font-semibold text-neutral-950 dark:text-white text-xl mb-0.5 leading-tight', titleClassName)}>{title}</h3>
              {/* 🔤 NOTIFICATION CARD DESCRIPTION FONT SIZE */}
              <p className={cn('text-sm text-neutral-500', descriptionClassName)}>{description}</p>
            </div>
            <div className="flex flex-col gap-2 flex-1 overflow-hidden">
              {displayed.map((notif, idx) => (
                <div
                  key={`${notif.id}-${idx}`}
                  className={cn(
                    'flex items-center gap-3 p-2 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 cursor-pointer transform',
                    idx === 0 && notif.id === newId ? 'notif-enter' : 'notif-push'
                  )}
                  onMouseEnter={() => setHoveredNotification(notif.id)}
                  onMouseLeave={() => setHoveredNotification(null)}
                >
                  <div
                    className={cn(
                      `w-8 h-8 rounded-full ${notif.color} flex items-center justify-center text-white text-sm flex-shrink-0 transition-transform duration-200`,
                      hoveredNotification === notif.id ? 'scale-110' : 'scale-100'
                    )}
                  >
                    {notif.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-semibold text-neutral-900 dark:text-neutral-100 truncate">{notif.title}</p>
                    <p className="text-[13px] text-neutral-500 dark:text-neutral-400 truncate">{notif.subtitle}</p>
                  </div>
                  <span className="text-[10px] text-neutral-400 whitespace-nowrap">{notif.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Export preset cards for common use cases

export const FilesSaveCard = () => (
  <BentoCard
    id="files-save"
    title="Save your files"
    description="We automatically save your files as you type."
    icon="📄"
    span="half"
  />
);

export const NotificationsCard = ({
  notifications = [
    {
      id: '1',
      type: 'event',
      icon: '📅',
      title: 'New event',
      subtitle: 'Magic UI',
      time: '2m ago',
      color: 'bg-blue-500',
    },
    {
      id: '2',
      type: 'message',
      icon: '💬',
      title: 'New message',
      subtitle: 'Magic UI',
      time: '5m ago',
      color: 'bg-pink-500',
    },
    {
      id: '3',
      type: 'payment',
      icon: '💳',
      title: 'Payment received',
      subtitle: 'Magic UI',
      time: '15m ago',
      color: 'bg-cyan-500',
    },
  ],
}: {
  notifications?: NotificationItem[];
}) => (
  <BentoCard
    id="notifications"
    title="Notifications"
    description="Get notified when something happens."
    icon="🔔"
    span="half"
    notifications={notifications}
  />
);

export const IntegrationsCard = () => (
  <BentoCard
    id="integrations"
    title="Integrations"
    description="Supports 100+ integrations and counting."
    icon="🔗"
    span="half"
  />
);

export const CalendarCard = () => (
  <BentoCard
    id="calendar"
    title="Calendar"
    description="Use the calendar to filter your files by date."
    icon="📅"
    span="half"
  />
);

// CSS Animation Keyframes - add to your global CSS
export const bentoAnimations = `
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out forwards;
}

.animate-slide-in-left {
  animation: slideInLeft 0.4s ease-out forwards;
}
`;
