"""initial migration

Revision ID: 1d81b7c34b44
Revises: None
Create Date: 2017-01-02 22:02:36.609173

"""

# revision identifiers, used by Alembic.
revision = '1d81b7c34b44'
down_revision = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.create_table('visitor',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=16), nullable=True),
    sa.Column('email', sa.String(length=30), nullable=True),
    sa.Column('message', sa.String(length=255), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('message'),
    sa.UniqueConstraint('name')
    )
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('visitor')
    ### end Alembic commands ###
