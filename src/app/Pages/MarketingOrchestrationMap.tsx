import {
  useMemo,
  useRef,
  useState,
  type FocusEvent,
  type MouseEvent,
} from 'react';

type ThemeMode = 'light' | 'dark';
type ActiveItem = 'center' | 'craft' | '01' | '02' | '03' | '04' | '05';
type SignalSeverity = 'High' | 'Medium' | 'Low';

interface MarketingOrchestrationMapProps {
  themeMode: ThemeMode;
  onOpenWorkspace: () => void;
}

type SignalItem = {
  title: string;
  description: string;
  severity: SignalSeverity;
};

type MapNode = {
  id: Exclude<ActiveItem, 'center' | 'craft'>;
  title: string[];
  descriptor: string;
  description: string[];
  circleLeft: string;
  circleTop: string;
  textLeft: string;
  textTop: string;
  textWidth: string;
  textAlign: 'left' | 'center' | 'right';
  delay: string;
  infoTitle: string;
  infoBody: string;
  signals: SignalItem[];
};

type HoverCardState = {
  item: ActiveItem;
  x: number;
  y: number;
} | null;

const TOOLTIP_WIDTH = 390;
const TOOLTIP_SIGNAL_HEIGHT = 350;
const TOOLTIP_SIMPLE_HEIGHT = 230;
const TOOLTIP_GAP = 22;

export default function MarketingOrchestrationMap({
  themeMode,
  onOpenWorkspace,
}: MarketingOrchestrationMapProps) {
  const [hoverCard, setHoverCard] = useState<HoverCardState>(null);
  const mapRef = useRef<HTMLElement | null>(null);
  const isDark = themeMode === 'dark';

  const palette = isDark
    ? {
        pageBg:
          'radial-gradient(circle at top center, rgba(212,175,55,0.06) 0%, rgba(5,11,22,1) 28%, rgba(5,11,22,1) 100%)',
        title: '#D4AF37',
        subtitle: '#B9C0CC',
        text: '#F5F3EE',
        body: '#D8DEE8',
        muted: '#AAB3C2',
        ring: 'rgba(212,175,55,0.30)',
        ringShadow: 'rgba(212,175,55,0.10)',
        hub: '#D4AF37',
        hubGlow: 'rgba(212,175,55,0.28)',
        accent: '#D4AF37',
        accentSoft: 'rgba(212,175,55,0.10)',
        infoBg: 'rgba(10, 18, 34, 0.97)',
        infoBorder: 'rgba(212,175,55,0.28)',
        infoTitle: '#F5F7FA',
        infoText: '#D8DEE8',
        buttonBg: '#D4AF37',
        buttonText: '#111111',
        tooltipShadow: '0 18px 38px rgba(0,0,0,0.28)',
      }
    : {
        pageBg:
          'radial-gradient(circle at top center, rgba(201,162,39,0.08) 0%, rgba(247,243,234,1) 34%, rgba(247,243,234,1) 100%)',
        title: '#B88A12',
        subtitle: '#6B7280',
        text: '#111111',
        body: '#2F3742',
        muted: '#667085',
        ring: 'rgba(184,138,18,0.20)',
        ringShadow: 'rgba(184,138,18,0.06)',
        hub: '#C9A227',
        hubGlow: 'rgba(201,162,39,0.18)',
        accent: '#C9A227',
        accentSoft: 'rgba(201,162,39,0.08)',
        infoBg: 'rgba(255,255,255,0.98)',
        infoBorder: 'rgba(201,162,39,0.24)',
        infoTitle: '#111111',
        infoText: '#2F3742',
        buttonBg: '#111111',
        buttonText: '#FFFFFF',
        tooltipShadow: '0 18px 38px rgba(17,17,17,0.12)',
      };

  const nodes: MapNode[] = [
    {
      id: '01',
      title: ['Integrated Media', 'Intelligence'],
      descriptor: 'THE EYES AND EARS',
      description: [
        'Sees market movement,',
        'campaign signals, competitors,',
        'and performance shifts.',
      ],
      circleLeft: '8%',
      circleTop: '9%',
      textLeft: '2%',
      textTop: '20%',
      textWidth: '24%',
      textAlign: 'center',
      delay: '0.18s',
      infoTitle: 'Integrated Media Intelligence',
      infoBody: 'Market and performance signal layer.',
      signals: [
        {
          title: 'Share-of-voice momentum',
          description: 'Brand visibility is rising across priority categories.',
          severity: 'Low',
        },
        {
          title: 'Competitive movement',
          description: 'Competitor activity is increasing in selected markets.',
          severity: 'Medium',
        },
        {
          title: 'Performance shift',
          description: 'Spend efficiency is changing across key channels.',
          severity: 'High',
        },
      ],
    },
    {
      id: '02',
      title: ['Creator to Commerce', 'ROI Engine'],
      descriptor: 'THE VOICE',
      description: ['Connects creator activity to', 'measurable business impact.'],
      circleLeft: '84%',
      circleTop: '9%',
      textLeft: '73%',
      textTop: '20%',
      textWidth: '24%',
      textAlign: 'center',
      delay: '0.28s',
      infoTitle: 'Creator to Commerce ROI Engine',
      infoBody: 'Creator impact and commerce signal layer.',
      signals: [
        {
          title: 'Top creator performance',
          description: 'Key creators are outperforming engagement benchmarks.',
          severity: 'Low',
        },
        {
          title: 'Creator-assisted conversion',
          description: 'Creator activity is strengthening conversion paths.',
          severity: 'Low',
        },
        {
          title: 'Product storytelling lift',
          description: 'Creator content is improving product consideration.',
          severity: 'Medium',
        },
      ],
    },
    {
      id: '03',
      title: ['Brand-Safe', 'Promotions Lab'],
      descriptor: 'THE HANDS',
      description: [
        'Executes promotions with brand,',
        'margin, legal, and inventory',
        'guardrails.',
      ],
      circleLeft: '18%',
      circleTop: '50%',
      textLeft: '10%',
      textTop: '61%',
      textWidth: '24%',
      textAlign: 'center',
      delay: '0.38s',
      infoTitle: 'Brand-Safe Promotions Lab',
      infoBody: 'Promotion safety and guardrail layer.',
      signals: [
        {
          title: 'Margin protection signal',
          description: 'Discount pressure may affect margin targets.',
          severity: 'High',
        },
        {
          title: 'Inventory readiness',
          description: 'Inventory confidence is below safe threshold in some markets.',
          severity: 'High',
        },
        {
          title: 'Guardrail status',
          description: 'Brand, legal, and margin checks are active.',
          severity: 'Medium',
        },
      ],
    },
    {
      id: '04',
      title: ['Trend-to-Plan', 'Demand Sensing'],
      descriptor: 'THE STOMACH AND GUT',
      description: ['Translates consumer demand', 'into planning reality.'],
      circleLeft: '46.8%',
      circleTop: '57%',
      textLeft: '36%',
      textTop: '66%',
      textWidth: '28%',
      textAlign: 'center',
      delay: '0.48s',
      infoTitle: 'Trend-to-Plan Demand Sensing',
      infoBody: 'Demand and planning readiness layer.',
      signals: [
        {
          title: 'Demand acceleration',
          description: 'Consumer interest is rising in priority categories.',
          severity: 'Low',
        },
        {
          title: 'Search demand movement',
          description: 'Search activity is shifting by market and product need.',
          severity: 'Medium',
        },
        {
          title: 'Planning readiness',
          description: 'Demand signals need alignment with inventory and timing.',
          severity: 'Medium',
        },
      ],
    },
    {
      id: '05',
      title: ['Media Influencer', 'Platform'],
      descriptor: 'THE LEGS AND MUSCLES',
      description: [
        'Activates media across',
        'channels, audiences, timing,',
        'and bids.',
      ],
      circleLeft: '76%',
      circleTop: '50%',
      textLeft: '74%',
      textTop: '59%',
      textWidth: '20%',
      textAlign: 'center',
      delay: '0.58s',
      infoTitle: 'Media Influencer Platform',
      infoBody: 'Media activation and optimization layer.',
      signals: [
        {
          title: 'Audience activation readiness',
          description: 'Priority audiences are ready for amplification.',
          severity: 'Low',
        },
        {
          title: 'Budget shift opportunity',
          description: 'Budget can move toward stronger conversion paths.',
          severity: 'Medium',
        },
        {
          title: 'Channel timing signal',
          description: 'Timing and bid strategy need optimization.',
          severity: 'Medium',
        },
      ],
    },
  ];

  const activeItem = hoverCard?.item ?? 'center';

  const activeContent = useMemo(() => {
    if (activeItem === 'center') {
      return {
        label: 'Shared Decision Layer',
        title: 'Shared Decision Workspace',
        body: 'Unified intelligence and action layer.',
        bullets: [
          'Aligns cross-platform intelligence in one place',
          'Supports faster and clearer decision-making',
          'Connects insight, governance, and action',
        ],
        signals: [],
      };
    }

    if (activeItem === 'craft') {
      return {
        label: 'Shared Creative Layer',
        title: 'CraftStudio',
        body: 'Creative production and activation readiness layer.',
        bullets: [
          'Supports content and asset production workflows',
          'Connects creative readiness to campaign decisions',
          'Helps operationalize execution across the ecosystem',
        ],
        signals: [],
      };
    }

    const activeNode = nodes.find((node) => node.id === activeItem);

    return {
      label: 'Specialized Capability',
      title: activeNode?.infoTitle ?? '',
      body: activeNode?.infoBody ?? '',
      bullets: [],
      signals: activeNode?.signals ?? [],
    };
  }, [activeItem, nodes]);

  const getTooltipHeight = (item: ActiveItem) => {
    if (item === 'center' || item === 'craft') {
      return TOOLTIP_SIMPLE_HEIGHT;
    }

    return TOOLTIP_SIGNAL_HEIGHT;
  };

  const positionTooltip = (item: ActiveItem, rect: DOMRect) => {
    const mapEl = mapRef.current;
    if (!mapEl) return;

    const mapRect = mapEl.getBoundingClientRect();
    const mapWidth = mapEl.clientWidth;
    const mapHeight = mapEl.scrollHeight;
    const tooltipHeight = getTooltipHeight(item);

    const targetX = rect.left - mapRect.left + rect.width / 2;
    const targetY = rect.top - mapRect.top + rect.height / 2;

    let x = 16;
    let y = 16;

    if (item === 'center' || item === 'craft') {
      // For the center hub and CraftStudio, place the pop-up above the hovered item.
      // This avoids covering the main visual and feels closer to the cursor.
      x = targetX - TOOLTIP_WIDTH / 2;
      y = targetY - rect.height / 2 - tooltipHeight - TOOLTIP_GAP;
    } else {
      // For the five app nodes, keep the pop-up beside the hovered number.
      const preferRight = targetX < mapWidth / 2;

      x = preferRight
        ? targetX + rect.width / 2 + TOOLTIP_GAP
        : targetX - rect.width / 2 - TOOLTIP_WIDTH - TOOLTIP_GAP;

      y = targetY - tooltipHeight / 2;
    }

    if (x + TOOLTIP_WIDTH > mapWidth - 16) {
      x = mapWidth - TOOLTIP_WIDTH - 16;
    }

    if (x < 16) {
      x = 16;
    }

    if (y + tooltipHeight > mapHeight - 16) {
      y = mapHeight - tooltipHeight - 16;
    }

    if (y < 16) {
      y = 16;
    }

    setHoverCard({ item, x, y });
  };

  const activateFromPointer = (
    item: ActiveItem,
    event: MouseEvent<HTMLElement>
  ) => {
    positionTooltip(item, event.currentTarget.getBoundingClientRect());
  };

  const activateFromFocus = (
    item: ActiveItem,
    event: FocusEvent<HTMLElement>
  ) => {
    positionTooltip(item, event.currentTarget.getBoundingClientRect());
  };

  const clearHover = () => {
    setHoverCard(null);
  };

  const getSeverityStyle = (severity: SignalSeverity) => {
    if (severity === 'High') {
      return {
        label: 'High',
        dot: '#D92D20',
        bg: 'rgba(217,45,32,0.08)',
        border: 'rgba(217,45,32,0.22)',
        text: '#B42318',
      };
    }

    if (severity === 'Medium') {
      return {
        label: 'Medium',
        dot: '#F79009',
        bg: 'rgba(247,144,9,0.10)',
        border: 'rgba(247,144,9,0.26)',
        text: '#B54708',
      };
    }

    return {
      label: 'Low',
      dot: '#12B76A',
      bg: 'rgba(18,183,106,0.10)',
      border: 'rgba(18,183,106,0.24)',
      text: '#027A48',
    };
  };

  return (
    <main
      className="ml-64 flex-1 overflow-y-auto px-8 py-8 transition-colors duration-300"
      style={{
        background: palette.pageBg,
        color: palette.text,
        minHeight: 'calc(100vh - 64px)',
      }}
    >
      <style>{`
        @keyframes mocFadeUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes mocPulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.04);
          }
        }

        @keyframes mocRingBreath {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.7;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.03);
            opacity: 1;
          }
        }

        @keyframes mocGlow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(212,175,55,0), 0 0 32px 8px rgba(212,175,55,0.10);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(212,175,55,0.04), 0 0 48px 12px rgba(212,175,55,0.20);
          }
        }

        @keyframes mocTooltipFade {
          0% {
            opacity: 0;
            transform: translateY(6px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .moc-fade-up {
          opacity: 0;
          animation: mocFadeUp 0.85s ease forwards;
        }

        .moc-ring {
          animation: mocRingBreath 5.4s ease-in-out infinite;
        }

        .moc-hub {
          animation: mocGlow 4.8s ease-in-out infinite;
        }

        .moc-node {
          transition: transform 180ms ease, filter 180ms ease;
        }

        .moc-node:hover {
          transform: translateY(-4px);
          filter: brightness(1.04);
        }

        .moc-node-circle {
          animation: mocPulse 3.2s ease-in-out infinite;
          transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
        }

        .moc-node-button {
          appearance: none;
          background: transparent;
          border: 0;
          padding: 0;
          cursor: pointer;
        }

        .moc-node-button:focus-visible {
          outline: 2px solid #C9A227;
          outline-offset: 4px;
          border-radius: 999px;
        }

        .moc-hover-card {
          animation: mocTooltipFade 0.18s ease;
        }

        .moc-button {
          transition: transform 180ms ease, box-shadow 180ms ease, opacity 180ms ease;
        }

        .moc-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(0,0,0,0.14);
        }

        .moc-button:active {
          transform: translateY(0);
        }

        .moc-craft {
          transition: transform 180ms ease, color 180ms ease, text-shadow 180ms ease;
        }

        .moc-craft:hover {
          transform: translateY(-2px);
        }

        .moc-review-label {
          cursor: default;
          user-select: none;
        }
      `}</style>

      <div className="mx-auto w-full max-w-[1500px]">
        <section
          className="moc-fade-up pt-6 text-center"
          style={{ animationDelay: '0.05s' }}
        >
          <p
            className="text-[13px] font-semibold uppercase tracking-[0.24em]"
            style={{ color: palette.muted }}
          >
            Marketing Orchestration Map
          </p>

          <h1
            className="mx-auto mt-4 max-w-[980px] text-[44px] font-bold leading-[0.98] sm:text-[58px] lg:text-[74px]"
            style={{
              color: palette.title,
              fontFamily: "Georgia, 'Times New Roman', serif",
              letterSpacing: '-0.03em',
            }}
          >
            L&apos;Oréal Marketing Orchestration Center
          </h1>

          <p
            className="mx-auto mt-5 max-w-[980px] text-[22px] italic leading-[1.45] sm:text-[28px]"
            style={{
              color: palette.subtitle,
              fontFamily: "Georgia, 'Times New Roman', serif",
            }}
          >
            One marketing body, multiple specialized functions
          </p>
        </section>

        <section
          ref={mapRef}
          className="relative mt-10"
          style={{ minHeight: 1240 }}
          onMouseLeave={clearHover}
        >
          {hoverCard && (
            <div
              className="moc-hover-card absolute z-[60] border px-5 py-4"
              style={{
                left: hoverCard.x,
                top: hoverCard.y,
                width: `${TOOLTIP_WIDTH}px`,
                borderRadius: '6px',
                background: palette.infoBg,
                borderColor: palette.infoBorder,
                boxShadow: palette.tooltipShadow,
                pointerEvents: 'auto',
              }}
            >
              <div
                className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: palette.accent }}
              >
                {activeContent.label}
              </div>

              <div
                className="mt-2 text-[20px] font-semibold leading-[1.2]"
                style={{
                  color: palette.infoTitle,
                  letterSpacing: '-0.02em',
                }}
              >
                {activeContent.title}
              </div>

              <div
                className="mt-2 text-[13px] leading-[1.6]"
                style={{ color: palette.infoText }}
              >
                {activeContent.body}
              </div>

              {activeContent.signals.length > 0 ? (
                <div className="mt-4">
                  <div
                    className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em]"
                    style={{ color: palette.accent }}
                  >
                    Top 3 Signals
                  </div>

                  <div className="grid gap-3">
                    {activeContent.signals.map((signal) => {
                      const severity = getSeverityStyle(signal.severity);

                      return (
                        <div
                          key={signal.title}
                          className="border px-3 py-3"
                          style={{
                            borderRadius: '6px',
                            borderColor: isDark
                              ? 'rgba(212,175,55,0.22)'
                              : 'rgba(201,162,39,0.18)',
                            background: isDark
                              ? 'rgba(255,255,255,0.04)'
                              : 'rgba(250,248,243,0.92)',
                          }}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div
                                className="text-[13px] font-semibold leading-[1.3]"
                                style={{ color: palette.infoTitle }}
                              >
                                {signal.title}
                              </div>

                              <div
                                className="mt-1 text-[12px] leading-[1.55]"
                                style={{ color: palette.infoText }}
                              >
                                {signal.description}
                              </div>
                            </div>

                            <div
                              className="shrink-0 border px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.1em]"
                              style={{
                                borderRadius: '999px',
                                background: severity.bg,
                                borderColor: severity.border,
                                color: severity.text,
                              }}
                            >
                              <span
                                className="mr-1 inline-block h-1.5 w-1.5 rounded-full"
                                style={{ background: severity.dot }}
                              />
                              {severity.label}
                            </div>
                          </div>

                          <div
                            className="moc-review-label mt-2 inline-flex items-center gap-1 text-[12px] font-semibold"
                            style={{
                              color: palette.accent,
                              textDecoration: 'underline',
                              textUnderlineOffset: '3px',
                            }}
                            aria-label="Review signal in the related app"
                          >
                            Review Signal
                            <span aria-hidden="true">→</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="mt-4 grid gap-2">
                  {activeContent.bullets.map((bullet) => (
                    <div key={bullet} className="flex items-start gap-2">
                      <div
                        className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: palette.accent }}
                      />
                      <div
                        className="text-[13px] leading-[1.6]"
                        style={{ color: palette.infoText }}
                      >
                        {bullet}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <button
            type="button"
            onMouseEnter={(event) => activateFromPointer('center', event)}
            onFocus={(event) => activateFromFocus('center', event)}
            onClick={(event) => activateFromPointer('center', event)}
            className="moc-node-button absolute left-1/2 top-[28%] z-[3] -translate-x-1/2 -translate-y-1/2"
            style={{
              width: 260,
              height: 260,
            }}
            aria-label="Show Shared Decision Workspace information"
          >
            <div
              className="moc-hub absolute left-1/2 top-1/2 rounded-full"
              style={{
                width: 108,
                height: 108,
                transform: 'translate(-50%, -50%)',
                background: palette.hub,
                boxShadow:
                  activeItem === 'center'
                    ? `0 0 48px 14px ${palette.hubGlow}`
                    : `0 0 40px 10px ${palette.hubGlow}`,
              }}
            />

            {[1, 2, 3].map((ring, index) => (
              <div
                key={ring}
                className="moc-ring absolute left-1/2 top-1/2 rounded-full border"
                style={{
                  width: `${ring * 150 + 100}px`,
                  height: `${ring * 150 + 100}px`,
                  transform: 'translate(-50%, -50%)',
                  borderColor:
                    activeItem === 'center' ? palette.accent : palette.ring,
                  borderWidth: activeItem === 'center' ? '2.5px' : '2px',
                  boxShadow: `0 0 0 1px ${palette.ringShadow}`,
                  animationDelay: `${index * 0.2}s`,
                }}
              />
            ))}
          </button>

          <div
            className="moc-fade-up absolute left-1/2 top-[39%] z-10 -translate-x-1/2 text-center"
            style={{ animationDelay: '0.7s' }}
          >
            <div
              className="text-[28px] font-bold sm:text-[34px]"
              style={{
                color: activeItem === 'center' ? palette.accent : palette.title,
                fontFamily: "Georgia, 'Times New Roman', serif",
                transition: 'color 180ms ease',
              }}
            >
              Shared Decision Workspace
            </div>

            <div
              className="mt-2 text-[17px] sm:text-[19px]"
              style={{ color: palette.body }}
            >
              A unified view for coordinated marketing decisions
            </div>
          </div>

          {nodes.map((node, index) => {
            const isActive = activeItem === node.id;

            return (
              <div key={node.id}>
                <button
                  type="button"
                  onMouseEnter={(event) => activateFromPointer(node.id, event)}
                  onFocus={(event) => activateFromFocus(node.id, event)}
                  onClick={(event) => activateFromPointer(node.id, event)}
                  className="moc-node moc-node-button absolute z-[4]"
                  style={{
                    left: node.circleLeft,
                    top: node.circleTop,
                    width: 92,
                    height: 92,
                  }}
                  aria-label={`Show information for ${node.infoTitle}`}
                >
                  <div
                    className="moc-node-circle relative rounded-full border-[4px]"
                    style={{
                      width: 92,
                      height: 92,
                      borderColor: isActive ? palette.title : palette.accent,
                      background: isDark
                        ? 'rgba(5,11,22,0.82)'
                        : 'rgba(255,255,255,0.90)',
                      boxShadow: isActive
                        ? `0 0 0 8px ${palette.accentSoft}`
                        : 'none',
                    }}
                  >
                    <div
                      className="absolute left-1/2 top-1/2 flex h-[38px] w-[38px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-[15px] font-bold"
                      style={{
                        background: palette.accent,
                        color: isDark ? '#111111' : '#FFFFFF',
                      }}
                    >
                      {node.id}
                    </div>
                  </div>
                </button>

                <div
                  className="moc-fade-up absolute z-[5]"
                  style={{
                    left: node.textLeft,
                    top: node.textTop,
                    width: node.textWidth,
                    textAlign: node.textAlign,
                    animationDelay: `${0.2 + index * 0.12}s`,
                  }}
                >
                  <div
                    className="text-[24px] font-bold leading-[1.18] sm:text-[30px]"
                    style={{
                      color: isActive ? palette.accent : palette.text,
                      transition: 'color 180ms ease',
                    }}
                  >
                    {node.title.map((line) => (
                      <div key={line}>{line}</div>
                    ))}
                  </div>

                  <div
                    className="mt-5 text-[15px] font-bold tracking-[0.1em] sm:text-[18px]"
                    style={{
                      color: palette.accent,
                    }}
                  >
                    {node.descriptor}
                  </div>

                  <div
                    className="mx-auto mt-3"
                    style={{
                      width: isActive ? '84%' : '72%',
                      height: '3px',
                      borderRadius: 999,
                      background: palette.accent,
                      transition: 'width 180ms ease',
                    }}
                  />

                  <div
                    className="mt-5 text-[17px] leading-[1.55]"
                    style={{
                      color: palette.body,
                    }}
                  >
                    {node.description.map((line) => (
                      <div key={line}>{line}</div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          <button
            type="button"
            onMouseEnter={(event) => activateFromPointer('craft', event)}
            onFocus={(event) => activateFromFocus('craft', event)}
            onClick={(event) => activateFromPointer('craft', event)}
            className="moc-node-button moc-fade-up absolute left-1/2 top-[89%] z-10 -translate-x-1/2 text-center"
            style={{ animationDelay: '0.95s' }}
            aria-label="Show information for CraftStudio"
          >
            <div
              className="moc-craft text-[42px] italic leading-none sm:text-[52px]"
              style={{
                color: activeItem === 'craft' ? palette.accent : palette.title,
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontWeight: 700,
                textShadow:
                  activeItem === 'craft'
                    ? `0 0 14px ${palette.accentSoft}`
                    : 'none',
              }}
            >
              CraftStudio
            </div>
          </button>
        </section>

        <section
          className="moc-fade-up pb-16 text-center"
          style={{ animationDelay: '1.05s' }}
        >
          <button
            type="button"
            onClick={onOpenWorkspace}
            className="moc-button inline-flex items-center gap-3 px-8 py-4 text-[20px] font-semibold"
            style={{
              borderRadius: '6px',
              background: palette.buttonBg,
              color: palette.buttonText,
            }}
          >
            Open Shared Decision Workspace
            <span aria-hidden="true" className="text-[22px]">
              →
            </span>
          </button>
        </section>
      </div>
    </main>
  );
}