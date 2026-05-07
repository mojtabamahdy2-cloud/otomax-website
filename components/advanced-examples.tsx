'use client';

import { BentoGrid, BentoCard, NotificationItem } from '@/components/bento-grid';
import { useState, useMemo } from 'react';

/**
 * Advanced Examples for BentoGrid Component
 * Demonstrates complex customizations and patterns
 */

// Example 1: Dynamic Notifications with Real-time Updates
export function DynamicNotificationsExample() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      type: 'event' as const,
      icon: '📅',
      title: 'Meeting scheduled',
      subtitle: 'Team Standup',
      time: '30m ago',
      color: 'bg-blue-500',
    },
  ]);

  const addNotification = () => {
    const newNotification = {
      id: Math.random().toString(),
      type: 'message' as const,
      icon: '💬',
      title: 'New message received',
      subtitle: 'John Doe',
      time: 'now',
      color: 'bg-pink-500',
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  return (
    <div className="space-y-4">
      <button
        onClick={addNotification}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Add Notification
      </button>
      <BentoGrid>
        <BentoCard
          title="Real-time Notifications"
          description="Notifications update in real-time"
          icon="🔔"
          span="half"
          notifications={notifications}
        />
      </BentoGrid>
    </div>
  );
}

// Example 2: Custom Grid Layout with Different Sizes
export function CustomGridLayoutExample() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Custom 2x2 Grid</h3>
        <BentoGrid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-2 auto-rows-[250px]">
          <BentoCard
            title="Large Card 1"
            description="This is a larger card with more space"
            icon="🎯"
            span="half"
          />
          <BentoCard
            title="Large Card 2"
            description="Another large card for comparison"
            icon="📊"
            span="half"
          />
          <BentoCard
            title="Wide Card"
            description="This card spans the full width"
            icon="🚀"
            span="full"
          />
        </BentoGrid>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Compact Grid</h3>
        <BentoGrid className="grid-cols-2 md:grid-cols-4 gap-2 auto-rows-[120px]">
          <BentoCard
            title="Compact"
            description="Smaller cards"
            icon="1️⃣"
            span="half"
            className="p-3"
          />
          <BentoCard
            title="Compact"
            description="Smaller cards"
            icon="2️⃣"
            span="half"
            className="p-3"
          />
          <BentoCard
            title="Compact"
            description="Smaller cards"
            icon="3️⃣"
            span="half"
            className="p-3"
          />
          <BentoCard
            title="Compact"
            description="Smaller cards"
            icon="4️⃣"
            span="half"
            className="p-3"
          />
        </BentoGrid>
      </div>
    </div>
  );
}

// Example 3: Cards with Different Color Schemes
export function ColoredCardsExample() {
  const cards = [
    {
      title: 'Blue Theme',
      description: 'Custom blue styling',
      icon: '🔵',
      className: 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 hover:shadow-blue-200 dark:hover:shadow-blue-900',
    },
    {
      title: 'Green Theme',
      description: 'Custom green styling',
      icon: '🟢',
      className: 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 hover:shadow-green-200 dark:hover:shadow-green-900',
    },
    {
      title: 'Purple Theme',
      description: 'Custom purple styling',
      icon: '🟣',
      className: 'bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800 hover:shadow-purple-200 dark:hover:shadow-purple-900',
    },
    {
      title: 'Orange Theme',
      description: 'Custom orange styling',
      icon: '🟠',
      className: 'bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800 hover:shadow-orange-200 dark:hover:shadow-orange-900',
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Colored Cards</h3>
      <BentoGrid>
        {cards.map((card, idx) => (
          <BentoCard
            key={idx}
            title={card.title}
            description={card.description}
            icon={card.icon}
            span="half"
            className={card.className}
          />
        ))}
      </BentoGrid>
    </div>
  );
}

// Example 4: Card with Custom Children
export function CustomChildrenExample() {
  return (
    <BentoGrid>
      <BentoCard
        title="Custom Content"
        description="Cards can contain any React children"
        icon="🎨"
        span="full"
      >
        <div className="mt-4 space-y-2">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-600 rounded-lg" />
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            You can add custom components, charts, images, or any React element here.
          </p>
        </div>
      </BentoCard>
    </BentoGrid>
  );
}

// Example 5: Cards with Category Filter
export function FilteredCardsExample() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'work' | 'personal'>('all');

  const allCards = [
    { title: 'Project Alpha', category: 'work' as const, icon: '💼' },
    { title: 'Project Beta', category: 'work' as const, icon: '💼' },
    { title: 'Hobby Project', category: 'personal' as const, icon: '🎨' },
    { title: 'Learning Path', category: 'personal' as const, icon: '📚' },
  ];

  const filteredCards = useMemo(() => {
    if (selectedCategory === 'all') return allCards;
    return allCards.filter((card) => card.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {['all', 'work', 'personal'].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category as any)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <BentoGrid>
        {filteredCards.map((card, idx) => (
          <BentoCard
            key={idx}
            title={card.title}
            description={`${card.category} project`}
            icon={card.icon}
            span="half"
            className="animate-fade-in-up"
            style={{ animationDelay: `${idx * 0.1}s` } as any}
          />
        ))}
      </BentoGrid>
    </div>
  );
}

// Example 6: Dashboard Layout
export function DashboardLayoutExample() {
  const stats = [
    { label: 'Total Users', value: '12,584', icon: '👥', trend: '+12%' },
    { label: 'Revenue', value: '$45,231', icon: '💰', trend: '+23%' },
    { label: 'Conversion', value: '3.24%', icon: '📈', trend: '+4.5%' },
    { label: 'Sessions', value: '89,123', icon: '🔄', trend: '+18%' },
  ];

  const notifications = [
    {
      id: '1',
      type: 'event' as const,
      icon: '🎉',
      title: 'Milestone reached',
      subtitle: '100K users',
      time: '2h ago',
      color: 'bg-yellow-500',
    },
    {
      id: '2',
      type: 'payment' as const,
      icon: '✅',
      title: 'Payment processed',
      subtitle: '$1,234.56',
      time: '4h ago',
      color: 'bg-green-500',
    },
    {
      id: '3',
      type: 'message' as const,
      icon: '⚠️',
      title: 'System alert',
      subtitle: 'Server CPU high',
      time: '1h ago',
      color: 'bg-red-500',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Key Metrics</h3>
        <BentoGrid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[150px]">
          {stats.map((stat, idx) => (
            <BentoCard
              key={idx}
              title={stat.label}
              description={`${stat.value} ${stat.trend}`}
              icon={stat.icon}
              span="half"
              className="animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.1}s` } as any}
            />
          ))}
        </BentoGrid>
      </div>

      {/* Notifications */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <BentoGrid>
          <BentoCard
            title="Activity Feed"
            description="Latest events and alerts"
            icon="🔔"
            span="full"
            notifications={notifications}
          />
        </BentoGrid>
      </div>
    </div>
  );
}

// Example 7: Interactive Example Switcher
export function AdvancedExamplesToC() {
  const [activeExample, setActiveExample] = useState<number>(0);

  const examples = [
    {
      title: 'Dynamic Notifications',
      component: DynamicNotificationsExample,
    },
    {
      title: 'Custom Grid Layouts',
      component: CustomGridLayoutExample,
    },
    {
      title: 'Colored Cards',
      component: ColoredCardsExample,
    },
    {
      title: 'Filtered Cards',
      component: FilteredCardsExample,
    },
    {
      title: 'Dashboard Layout',
      component: DashboardLayoutExample,
    },
  ];

  const ActiveComponent = examples[activeExample].component;

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4 animate-fade-in-up">
          <h1 className="text-4xl font-bold text-neutral-950 dark:text-white">
            Advanced Examples
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Explore complex use cases and customization patterns
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap gap-2">
          {examples.map((example, idx) => (
            <button
              key={idx}
              onClick={() => setActiveExample(idx)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeExample === idx
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800'
              }`}
            >
              {example.title}
            </button>
          ))}
        </div>

        {/* Active Example */}
        <div className="animate-fade-in-up">
          <ActiveComponent />
        </div>
      </div>
    </div>
  );
}

export default AdvancedExamplesToC;
