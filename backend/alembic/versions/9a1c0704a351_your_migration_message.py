"""your_migration_message

Revision ID: 9a1c0704a351
Revises: 8c0f809596de
Create Date: 2024-09-21 12:21:30.644650

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '9a1c0704a351'
down_revision: Union[str, None] = '8c0f809596de'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
