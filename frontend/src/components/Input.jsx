export default function Input({ title, input, type }) {
  return (
    <label className="form-control">
      <div className="label">
        <span className="label-text">{title}</span>
      </div>
      <input
        type={type}
        className="input input-bordered"
        name={input}
        id={input}
        autoComplete={input}
      />
    </label>
  );
}
