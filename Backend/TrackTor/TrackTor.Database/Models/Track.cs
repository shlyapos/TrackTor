using TrackTor.Database.Models.enums;

namespace TrackTor.Database.Models;

public class Track
{
    public Guid Id { get; }
    public Guid UserId { get; set; }
    public string Name { get; set; }
    public TransportType TransportType { get; set; }
    public string? Region { get; set; }
    
    
}