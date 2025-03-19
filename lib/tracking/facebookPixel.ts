import axios from "axios";
import crypto from "crypto";

// Types for Facebook Pixel events
export interface FacebookPixelEvent {
  action_source: string;
  event_name: string;
  event_time: number;
  user_data: Record<string, any>;
  attribution_data?: {
    attribution_share: number;
  };
  custom_data?: Record<string, any>;
  original_event_data: {
    event_name: string;
    event_time: number;
  };
}

export interface TrackingOptions {
  eventName: string;
  userData: Record<string, any>;
  attributionShare?: number;
  customData?: Record<string, any>;
}

// Function to hash email for Facebook Pixel
export function hashEmail(email: string): string {
  return crypto
    .createHash("sha256")
    .update(email.toLowerCase().trim())
    .digest("hex");
}

// Client-side tracking service
export class FacebookPixelTracker {
  private static isLocalhost(): boolean {
    if (typeof window === "undefined") return false;

    return (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
    );
  }

  private static getCurrentTimestamp(): number {
    return Math.floor(Date.now() / 1000);
  }

  private static getUserAgent(): string {
    if (typeof window === "undefined") return "";
    return window.navigator.userAgent;
  }

  // Track a generic event
  public static async trackEvent(options: TrackingOptions): Promise<void> {
    try {
      const {
        eventName,
        userData,
        attributionShare = 0.2,
        customData,
      } = options;

      const eventTime = this.getCurrentTimestamp();
      const userAgent = this.getUserAgent();
      const isLocalhost = this.isLocalhost();

      // Prepare the request payload
      const payload = {
        eventName,
        eventTime,
        userData: {
          ...userData,
          client_user_agent: userAgent,
        },
        attributionData: {
          attribution_share: attributionShare,
        },
        customData,
        isLocalhost,
      };

      // Send the tracking request to our API endpoint
      await axios.post("/api/tracking/facebook-pixel", payload);
    } catch (error) {
      console.error(
        `Error tracking Facebook Pixel ${options.eventName} event:`,
        error
      );
    }
  }

  // Specific event tracking methods
  public static async trackBlueskyLinkClick(): Promise<void> {
    await this.trackEvent({
      eventName: "ViewContent",
      userData: {},
      attributionShare: 0.1,
    });
  }

  public static async trackPurchase(
    email: string,
    amount: number
  ): Promise<void> {
    await this.trackEvent({
      eventName: "Purchase",
      userData: {
        em: [hashEmail(email)],
      },
      attributionShare: 0.6,
      customData: {
        value: amount,
        currency: "USD",
      },
    });
  }

  public static async trackRegistration(email: string): Promise<void> {
    await this.trackEvent({
      eventName: "CompleteRegistration",
      userData: {
        em: [hashEmail(email)],
      },
      attributionShare: 0.4,
    });
  }
}
