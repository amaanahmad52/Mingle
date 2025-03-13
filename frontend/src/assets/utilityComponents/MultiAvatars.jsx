
export const MultiAvatars = ({count}) => {
    return (
        <div className="avatar-group -space-x-7 w-20">
  <div className="avatar">
    <div className="w-12 ">
      <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
    </div>
  </div>
  <div className="avatar">
    <div className="w-12">
      <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
    </div>
  </div>
  <div className="avatar">
    <div className="w-12">
      <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
    </div>
  </div>
  <div className="avatar avatar-placeholder">
    <div className="bg-neutral text-neutral-content w-12">
      <span>{count}</span>
    </div>
  </div>
</div>
    )
}