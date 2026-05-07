import React, { CSSProperties, ReactNode, useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

type IPhoneModel = '14' | '14-pro' | '15' | '15-pro' | 'x' | 'plain';
type Orientation = 'portrait' | 'landscape';
type WallpaperFit = 'cover' | 'contain' | 'fill';

export interface IPhoneMockupProps {
  model?: IPhoneModel;
  color?: 'black' |'silver' |  'midnight' | 'starlight' | 'space-black' | 'gold' | 'blue' | 'pink' | 'titanium' | 'natural-titanium' | 'green' | 'red' | string;
  orientation?: Orientation;
  scale?: number;
  bezel?: number;
  radius?: number;
  shadow?: boolean | string;
  screenBg?: string;
  wallpaper?: string;
  wallpaperFit?: WallpaperFit;
  wallpaperPosition?: string;
  showDynamicIsland?: boolean;
  showNotch?: boolean;
  safeArea?: boolean;
  showHomeIndicator?: boolean;
  innerShadow?: boolean;
  showStatusBar?: boolean;
  statusBarColor?: string;
  animateOnScroll?: boolean;
  noGradient?: boolean;
  style?: CSSProperties;
  className?: string;
  frameStyle?: CSSProperties;
  screenStyle?: CSSProperties;
  children?: ReactNode;
}

const DEVICE_SPECS: Record<IPhoneModel, {
  w: number; h: number; radius: number; bezel: number;
  topSafe: number; bottomSafe: number;
  notch?: { w: number; h: number; r: number };
  island?: { w: number; h: number; r: number };
}> = {
  x: { w: 375, h: 812, radius: 50, bezel: 12, topSafe: 47, bottomSafe: 34, notch: { w: 210, h: 35, r: 18 } },
  '14': { w: 390, h: 844, radius: 56, bezel: 12, topSafe: 47, bottomSafe: 34, notch: { w: 225, h: 33, r: 18 } },
  '14-pro': { w: 393, h: 852, radius: 56, bezel: 12, topSafe: 59, bottomSafe: 34, island: { w: 126, h: 37, r: 20 } },
  '15': { w: 393, h: 852, radius: 56, bezel: 12, topSafe: 59, bottomSafe: 34, island: { w: 126, h: 37, r: 20 } },
  '15-pro': { w: 393, h: 852, radius: 56, bezel: 12, topSafe: 59, bottomSafe: 34, island: { w: 126, h: 37, r: 20 } },
  plain: { w: 390, h: 844, radius: 56, bezel: 12, topSafe: 16, bottomSafe: 16 }
};

const PRESET_COLORS: Record<string, string> = {
  black: '#1f2022',
  midnight: '#192028',
  silver: '#e2e3e5',
  starlight: '#f1eee9',
  'space-black': '#27282a',
  gold: '#f4e3c5',
  blue: '#3b4353',
  pink: '#fce2e5',
  titanium: '#878681',
  'natural-titanium': '#a69a8a',
  green: '#454d42',
  red: '#a5282c'
};

export const IPhoneMockup: React.FC<IPhoneMockupProps> = ({
  model = '15-pro',
  color = 'gold',
  orientation = 'portrait',
  scale = 1,
  bezel,
  radius,
  shadow = true,
  screenBg = '#000',
  wallpaper,
  wallpaperFit = 'cover',
  wallpaperPosition = 'center',
  showDynamicIsland,
  showNotch,
  safeArea = true,
  showHomeIndicator = true,
  innerShadow = true,
  showStatusBar = true,
  statusBarColor = '#ffffff',
  animateOnScroll = false,
  noGradient = false,
  style,
  className,
  frameStyle,
  screenStyle,
  children
}) => {
  const spec = DEVICE_SPECS[model];
  const [time, setTime] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!showStatusBar) return;
    const updateTime = () => {
      try {
        const riyadhTime = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Riyadh',
          hour: 'numeric',
          minute: '2-digit',
          hour12: false
        }).format(new Date());
        setTime(riyadhTime);
      } catch (e) {
        setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      }
    };
    
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, [showStatusBar]);
  const W = spec.w;
  const H = spec.h;

  const useIsland = typeof showDynamicIsland === 'boolean' ? showDynamicIsland : Boolean(spec.island);
  const useNotch = typeof showNotch === 'boolean' ? showNotch : Boolean(spec.notch) && !useIsland;

  const resolvedRadius = radius ?? spec.radius;
  const resolvedBezel = bezel ?? spec.bezel;

  const isLandscape = orientation === 'landscape';
  const screenWidth = isLandscape ? H : W;
  const screenHeight = isLandscape ? W : H;

  const outerWidth = screenWidth + resolvedBezel * 2;
  const outerHeight = screenHeight + resolvedBezel * 2;
  const outerRadius = resolvedRadius + resolvedBezel;

  const colorHex = PRESET_COLORS[color] ?? color;
  
  // A more realistic metallic gradient with a subtle shine and shadow edges
  const frameGradient = noGradient ? colorHex : `linear-gradient(145deg, 
    rgba(255,255,255,0.4) 0%, 
    ${colorHex} 15%, 
    ${colorHex} 85%, 
    rgba(0,0,0,0.5) 100%
  )`;

  const outerShadow = typeof shadow === 'string' ? shadow : shadow 
    ? `0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0,0,0,0.1)` 
    : 'none';
    
  const frameShadow = `inset 0 0 0 1px rgba(255,255,255,0.2), inset 0 0 4px rgba(0,0,0,0.3), ${outerShadow}`;

  const innerShadowCss = innerShadow 
    ? 'inset 0 0 0 1px rgba(0,0,0,0.2), inset 0 10px 20px rgba(0,0,0,0.5)' 
    : 'none';

  const wrapperStyle: CSSProperties = {
    position: 'relative',
    boxSizing: 'border-box',
    display: 'inline-block',
    transform: `scale(${scale})`,
    transformOrigin: 'center',
    ...style
  };

  const frameBoxStyle: CSSProperties = {
    width: outerWidth,
    height: outerHeight,
    borderRadius: outerRadius,
    background: frameGradient,
    padding: resolvedBezel,
    boxSizing: 'border-box',
    boxShadow: frameShadow,
    position: 'relative',
    overflow: 'hidden',
    ...frameStyle
  };

  const buttonBaseStyle: CSSProperties = {
    position: 'absolute',
    background: noGradient ? colorHex : `linear-gradient(to bottom, rgba(255,255,255,0.4) 0%, ${colorHex} 20%, ${colorHex} 80%, rgba(0,0,0,0.4) 100%)`,
    boxShadow: noGradient ? 'none' : 'inset 0 0 2px rgba(0,0,0,0.3)',
    zIndex: 0,
  };

  const screenBoxStyle: CSSProperties = {
    width: '100%',
    height: '100%',
    borderRadius: resolvedRadius,
    position: 'relative',
    overflow: 'hidden',
    background: screenBg,
    boxShadow: innerShadowCss,
    ...screenStyle
  };

  const cutoutCommon: CSSProperties = {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#000',
    zIndex: 100, // Absolute top
    boxShadow: '0 0 0 1px rgba(255,255,255,0.1)', // Subtle border to make it visible on black
  };

  const homeIndicatorStyle: CSSProperties = {
    position: 'absolute',
    bottom: 8,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 120,
    height: 5,
    borderRadius: 3,
    background: 'rgba(255,255,255,0.5)',
    zIndex: 100,
    pointerEvents: 'none'
  };

  const contentStyle: CSSProperties = {
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column'
  };

  const renderButtons = () => {
    return null;
  };

  return (
    <div ref={containerRef} className={className} style={wrapperStyle}>
      {renderButtons()}
      <div style={frameBoxStyle}>
        <div style={screenBoxStyle}>
          {/* Dynamic Island */}
          {useIsland && (
            <div
              style={{
                ...cutoutCommon,
                top: 12,
                width: spec.island?.w ?? 120,
                height: spec.island?.h ?? 35,
                borderRadius: spec.island?.r ?? 20
              }}
            />
          )}

          {/* Notch */}
          {!useIsland && useNotch && (
            <div
              style={{
                ...cutoutCommon,
                top: 8,
                width: spec.notch?.w ?? 200,
                height: spec.notch?.h ?? 30,
                borderRadius: spec.notch?.r ?? 15
              }}
            />
          )}

          {/* Status Bar */}
          {showStatusBar && (
            <div style={{
              position: 'absolute',
              top: 15,
              left: 30,
              right: 28,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              zIndex: 150,
              pointerEvents: 'none',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
              fontWeight: 600,
              fontSize: 15,
              color: statusBarColor,
              letterSpacing: -0.2
            }}>
              <div style={{ width: 54, textAlign: 'center' }}>
                {time}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, opacity: 0.9 }}>
                {/* Cellular */}
                <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
                  <rect x="1" y="8" width="3" height="4" rx="1" fill="currentColor"/>
                  <rect x="6" y="5" width="3" height="7" rx="1" fill="currentColor"/>
                  <rect x="11" y="2" width="3" height="10" rx="1" fill="currentColor"/>
                  <rect x="16" y="0" width="3" height="12" rx="1" fill="currentColor"/>
                </svg>
                {/* Wifi */}
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                  <path d="M8 12C8.82843 12 9.5 11.3284 9.5 10.5C9.5 9.67157 8.82843 9 8 9C7.17157 9 6.5 9.67157 6.5 10.5C6.5 11.3284 7.17157 12 8 12Z" fill="currentColor"/>
                  <path d="M11.66 7.34C10.66 6.34 9.38 5.84 8 5.84C6.62 5.84 5.34 6.34 4.34 7.34L3.16 6.16C4.46 4.86 6.18 4.18 8 4.18C9.82 4.18 11.54 4.86 12.84 6.16L11.66 7.34Z" fill="currentColor"/>
                  <path d="M15.18 3.82C13.26 1.9 10.72 0.84 8 0.84C5.28 0.84 2.74 1.9 0.82 3.82L2 5C3.6 3.4 5.72 2.5 8 2.5C10.28 2.5 12.4 3.4 14 5L15.18 3.82Z" fill="currentColor"/>
                </svg>
                {/* Battery with percentage */}
                <span style={{ fontSize: 13, marginRight: -2 }}>100%</span>
                <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
                  <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="currentColor" strokeWidth="1" />
                  <rect x="2" y="2" width="14" height="8" rx="2" fill="currentColor" />
                  <path d="M23 4V8C23.5523 8 24 7.55228 24 7V5C24 4.44772 23.5523 4 23 4Z" fill="currentColor"/>
                </svg>
              </div>
            </div>
          )}

          {/* Screen content */}
          <div style={contentStyle}>
            {animateOnScroll ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                style={{ width: '100%', height: '100%', transformOrigin: 'center' }}
              >
                {children}
              </motion.div>
            ) : (
              children
            )}
          </div>

          {showHomeIndicator && <div style={homeIndicatorStyle} />}
        </div>
      </div>
    </div>
  );
};

export default IPhoneMockup;
