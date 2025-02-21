RSpec.describe Tag, type: :model do
  subject { build(:tag) }

  it { is_expected.to belong_to(:taggable) }
end