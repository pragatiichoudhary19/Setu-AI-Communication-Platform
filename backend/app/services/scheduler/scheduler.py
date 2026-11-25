import asyncio
from datetime import datetime

from ...database import SessionLocal
from ... import models


async def campaign_scheduler():

    while True:

        db = SessionLocal()

        try:
            now = datetime.utcnow()

            scheduled_campaigns = (
                db.query(models.Campaign)
                .filter(
                    models.Campaign.status
                    == models.CampaignStatusEnum.scheduled,

                    models.Campaign.scheduled_at <= now
                )
                .all()
            )

            for campaign in scheduled_campaigns:

                print(
                    "Starting scheduled campaign:",
                    campaign.id
                )

                # Change status to sending
                campaign.status = (
                    models.CampaignStatusEnum.sending
                )

                db.commit()

                # Distribution sending logic will be called here
                # in next step

                print(
                    "Campaign moved to SENDING:",
                    campaign.id
                )


        except Exception as e:

            print(
                "Scheduler error:",
                e
            )

            db.rollback()

        finally:
            db.close()


        # Check every 60 seconds
        await asyncio.sleep(60)